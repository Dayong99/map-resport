/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-2a4f2d00","./Check-e5651467","./defaultValue-29c9b1af","./Math-7782f09e","./Cartesian2-ba70b51f","./Transforms-7d72c08c","./IntersectionTests-59cef209","./Plane-b1ca737b","./EllipsoidRhumbLine-d5a5f3d0","./EllipsoidGeodesic-666ad0d2"],function(a,T,e,w,P,y,b,v,m,A,r){"use strict";var E={numberOfPoints:function(a,e,r){var t=y.Cartesian3.distance(a,e);return Math.ceil(t/r)},numberOfPointsRhumbLine:function(a,e,r){var t=Math.pow(a.longitude-e.longitude,2)+Math.pow(a.latitude-e.latitude,2);return Math.ceil(Math.sqrt(t/(r*r)))}},o=new y.Cartographic;E.extractHeights=function(a,e){for(var r=a.length,t=new Array(r),i=0;i<r;i++){var n=a[i];t[i]=e.cartesianToCartographic(n,o).height}return t};var S=new b.Matrix4,R=new y.Cartesian3,M=new y.Cartesian3,D=new m.Plane(y.Cartesian3.UNIT_X,0),G=new y.Cartesian3,x=new m.Plane(y.Cartesian3.UNIT_X,0),N=new y.Cartesian3,I=new y.Cartesian3,V=[];function k(a,e,r){var t,i=V;if(i.length=a,e===r){for(t=0;t<a;t++)i[t]=e;return i}var n=(r-e)/a;for(t=0;t<a;t++){var o=e+t*n;i[t]=o}return i}var L=new y.Cartographic,_=new y.Cartographic,O=new y.Cartesian3,B=new y.Cartesian3,U=new y.Cartesian3,z=new r.EllipsoidGeodesic,X=new A.EllipsoidRhumbLine;function q(a,e,r,t,i,n,o,s){var c=t.scaleToGeodeticSurface(a,B),l=t.scaleToGeodeticSurface(e,U),u=E.numberOfPoints(a,e,r),f=t.cartesianToCartographic(c,L),h=t.cartesianToCartographic(l,_),d=k(u,i,n);z.setEndPoints(f,h);var C=z.surfaceDistance/u,g=s;f.height=i;var p=t.cartographicToCartesian(f,O);y.Cartesian3.pack(p,o,g),g+=3;for(var v=1;v<u;v++){var m=z.interpolateUsingSurfaceDistance(v*C,_);m.height=d[v],p=t.cartographicToCartesian(m,O),y.Cartesian3.pack(p,o,g),g+=3}return g}function W(a,e,r,t,i,n,o,s){var c=t.scaleToGeodeticSurface(a,B),l=t.scaleToGeodeticSurface(e,U),u=t.cartesianToCartographic(c,L),f=t.cartesianToCartographic(l,_),h=E.numberOfPointsRhumbLine(u,f,r),d=k(h,i,n);X.ellipsoid.equals(t)||(X=new A.EllipsoidRhumbLine(void 0,void 0,t)),X.setEndPoints(u,f);var C=X.surfaceDistance/h,g=s;u.height=i;var p=t.cartographicToCartesian(u,O);y.Cartesian3.pack(p,o,g),g+=3;for(var v=1;v<h;v++){var m=X.interpolateUsingSurfaceDistance(v*C,_);m.height=d[v],p=t.cartographicToCartesian(m,O),y.Cartesian3.pack(p,o,g),g+=3}return g}E.wrapLongitude=function(a,e){var r=[],t=[];if(T.defined(a)&&0<a.length){e=w.defaultValue(e,b.Matrix4.IDENTITY);var i=b.Matrix4.inverseTransformation(e,S),n=b.Matrix4.multiplyByPoint(i,y.Cartesian3.ZERO,R),o=y.Cartesian3.normalize(b.Matrix4.multiplyByPointAsVector(i,y.Cartesian3.UNIT_Y,M),M),s=m.Plane.fromPointNormal(n,o,D),c=y.Cartesian3.normalize(b.Matrix4.multiplyByPointAsVector(i,y.Cartesian3.UNIT_X,G),G),l=m.Plane.fromPointNormal(n,c,x),u=1;r.push(y.Cartesian3.clone(a[0]));for(var f=r[0],h=a.length,d=1;d<h;++d){var C=a[d];if(m.Plane.getPointDistance(l,f)<0||m.Plane.getPointDistance(l,C)<0){var g=v.IntersectionTests.lineSegmentPlane(f,C,s,N);if(T.defined(g)){var p=y.Cartesian3.multiplyByScalar(o,5e-9,I);m.Plane.getPointDistance(s,f)<0&&y.Cartesian3.negate(p,p),r.push(y.Cartesian3.add(g,p,new y.Cartesian3)),t.push(u+1),y.Cartesian3.negate(p,p),r.push(y.Cartesian3.add(g,p,new y.Cartesian3)),u=1}}r.push(y.Cartesian3.clone(a[d])),u++,f=C}t.push(u)}return{positions:r,lengths:t}},E.generateArc=function(a){T.defined(a)||(a={});var e=a.positions,r=e.length,t=w.defaultValue(a.ellipsoid,y.Ellipsoid.WGS84),i=w.defaultValue(a.height,0),n=b.isArray(i);if(r<1)return[];if(1===r){var o=t.scaleToGeodeticSurface(e[0],B);if(0!==(i=n?i[0]:i)){var s=t.geodeticSurfaceNormal(o,O);y.Cartesian3.multiplyByScalar(s,i,s),y.Cartesian3.add(o,s,o)}return[o.x,o.y,o.z]}var c=a.minDistance;if(!T.defined(c)){var l=w.defaultValue(a.granularity,P.CesiumMath.RADIANS_PER_DEGREE);c=P.CesiumMath.chordLength(l,t.maximumRadius)}var u,f=0;for(u=0;u<r-1;u++)f+=E.numberOfPoints(e[u],e[u+1],c);var h=3*(f+1),d=new Array(h),C=0;for(u=0;u<r-1;u++){C=q(e[u],e[u+1],c,t,n?i[u]:i,n?i[u+1]:i,d,C)}V.length=0;var g=e[r-1],p=t.cartesianToCartographic(g,L);p.height=n?i[r-1]:i;var v=t.cartographicToCartesian(p,O);return y.Cartesian3.pack(v,d,h-3),d};var Y=new y.Cartographic,H=new y.Cartographic;E.generateRhumbArc=function(a){T.defined(a)||(a={});var e=a.positions,r=e.length,t=w.defaultValue(a.ellipsoid,y.Ellipsoid.WGS84),i=w.defaultValue(a.height,0),n=b.isArray(i);if(r<1)return[];if(1===r){var o=t.scaleToGeodeticSurface(e[0],B);if(0!==(i=n?i[0]:i)){var s=t.geodeticSurfaceNormal(o,O);y.Cartesian3.multiplyByScalar(s,i,s),y.Cartesian3.add(o,s,o)}return[o.x,o.y,o.z]}var c,l,u=w.defaultValue(a.granularity,P.CesiumMath.RADIANS_PER_DEGREE),f=0,h=t.cartesianToCartographic(e[0],Y);for(c=0;c<r-1;c++)l=t.cartesianToCartographic(e[c+1],H),f+=E.numberOfPointsRhumbLine(h,l,u),h=y.Cartographic.clone(l,Y);var d=3*(f+1),C=new Array(d),g=0;for(c=0;c<r-1;c++){g=W(e[c],e[c+1],u,t,n?i[c]:i,n?i[c+1]:i,C,g)}V.length=0;var p=e[r-1],v=t.cartesianToCartographic(p,L);v.height=n?i[r-1]:i;var m=t.cartographicToCartesian(v,O);return y.Cartesian3.pack(m,C,d-3),C},E.generateCartesianArc=function(a){for(var e=E.generateArc(a),r=e.length/3,t=new Array(r),i=0;i<r;i++)t[i]=y.Cartesian3.unpack(e,3*i);return t},E.generateCartesianRhumbArc=function(a){for(var e=E.generateRhumbArc(a),r=e.length/3,t=new Array(r),i=0;i<r;i++)t[i]=y.Cartesian3.unpack(e,3*i);return t},a.PolylinePipeline=E});
