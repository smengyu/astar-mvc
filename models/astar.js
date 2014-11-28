﻿ function AstarModel(map) {  
     this.map = map;
     this.close = [];
     this.paths = [];
 }

 AstarModel.prototype = {
     reset: function () {
         this.close.length = 0;
         this.paths.length = 0;
     },
     getPath: function (start, end) {
         this.reset();
         this.end = end;
         this.close.push(start);
         this.paths.push([start]);
       return  this._extend();
     },
     _extend: function () {
         var i = 0, len = this.paths.length, newPaths = [];    
         for (; i < len; i++) {
             var path = this.paths[i], lastIndex = path.length - 1, x = path[lastIndex].x, y = path[lastIndex].y;
       
             if (this._checkXY(x + 1, y)) {
                 this._extendPath(x + 1, y, path, newPaths);
             }
             if (this._checkXY(x - 1, y)) {
                 this._extendPath(x -1, y, path, newPaths);
             }
             if (this._checkXY(x, y + 1)) {
                 this._extendPath(x , y+1, path, newPaths);
             }
             if (this._checkXY(x, y - 1)) {
                 this._extendPath(x , y-1, path, newPaths);
             }
         }
         this.paths = newPaths;
         var result=this._checkEnd();
         if (result) {
             return result;
         }
         else {          
          return  this._extend();
         }
     },
     _checkXY: function (x, y) {
         return  (x>-1&&x<this.map[0].length&& y>-1&&y<this.map.length&&  this.map[y][x] != 1 && !this._isInArray(x, y ))

     },
     _checkEnd: function () {
         var i = 0, len = this.paths.length;
         for (; i < len; i++) {
             var path = this.paths[i],lastIndex=path.length-1,end=path[lastIndex];
             if (end.x == this.end.x && end.y == this.end.y) {
                 return path;
             }
         }
         return null;
     },
     _extendPath: function (x, y, path, newPaths) {
         this.close.push({ x: x, y: y });
         var newPath = path.slice(0);
         newPath.push({ x: x, y: y });
         newPaths.push(newPath);
      
     },
     _isInArray: function (x,y) {
         var i=0,len=this.close.length;
         for (; i < len; i++) {
             var item = this.close[i];
             if (x == item.x && y == item.y) {
                 return true;
             }
         }
         return false;
     }
 }
