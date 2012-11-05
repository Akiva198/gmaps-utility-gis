/*

 Copyright (C) 2012 OSM Buildings, Jan Marsch
 A leightweight JavaScript library for visualizing 3D building geometry on interactive maps.
 @osmbuildings, http://osmbuildings.org

 NL changes: accept isNew property in geoJSON not to animate.
*/
(function(N){var ta=ta||Array,xa=Math.exp,ya=Math.log,za=Math.tan,Aa=Math.atan,ha=Math.min,Ba=Math.max,ia=N.document,v=function(){function V(e,g,l){if(l<0)l+=1;if(l>1)l-=1;if(l<1/6)return e+(g-e)*6*l;if(l<0.5)return g;if(l<2/3)return e+(g-e)*(2/3-l)*6;return e}function C(e,g,l,m){this.r=e;this.g=g;this.b=l;this.a=arguments.length<4?1:m}var W=C.prototype;W.toString=function(){return"rgba("+[this.r,this.g,this.b,this.a.toFixed(2)].join(",")+")"};W.adjustLightness=function(e){var g=v.toHSLA(this);g.l*=
e;g.l=Math.min(1,Math.max(0,g.l));var l,m;if(g.s===0)e=l=m=g.l;else{m=g.l<0.5?g.l*(1+g.s):g.l+g.s-g.l*g.s;var u=2*g.l-m;e=V(u,m,g.h+1/3);l=V(u,m,g.h);m=V(u,m,g.h-1/3)}return new v(~~(e*255),~~(l*255),~~(m*255),g.a)};W.adjustAlpha=function(e){return new v(this.r,this.g,this.b,this.a*e)};C.parse=function(e){e+="";if(~e.indexOf("#")){e=e.match(/^#?(\w{2})(\w{2})(\w{2})(\w{2})?$/);return new v(parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),e[4]?parseInt(e[4],16)/255:1)}if(e=e.match(/rgba?\((\d+)\D+(\d+)\D+(\d+)(\D+([\d.]+))?\)/))return new v(parseInt(e[1],
10),parseInt(e[2],10),parseInt(e[3],10),e[4]?parseFloat(e[5],10):1)};C.toHSLA=function(e){var g=e.r/255,l=e.g/255,m=e.b/255,u=Math.max(g,l,m),w=Math.min(g,l,m),D,I=(u+w)/2,E;if(u===w)D=w=0;else{E=u-w;w=I>0.5?E/(2-u-w):E/(u+w);switch(u){case g:D=(l-m)/E+(l<m?6:0);break;case l:D=(m-g)/E+2;break;case m:D=(g-l)/E+4;break}D/=6}return{h:D,s:w,l:I,a:e.a}};return C}(),X=Math.PI,ua=X/2,Ca=X/4,Da=180/X,Ea=256,ja=14,ka=400,va=ka-50,Y="latitude",Z="longitude",J=0,G=1,z=2,K=3;N.OSMBuildings=function(V){function C(a,
c){var b={};a/=$;c/=$;b[Y]=c<=0?90:c>=1?-90:Da*(2*Aa(xa(X*(1-2*c)))-ua);b[Z]=(a===1?1:(a%1+1)%1)*360-180;return b}function W(a,c){return a.replace(/\{ *([\w_]+) *\}/g,function(b,d){return c[d]})}function e(a,c){var b=new XMLHttpRequest;b.onreadystatechange=function(){if(b.readyState===4)!b.status||b.status<200||b.status>299||b.responseText&&c(JSON.parse(b.responseText))};b.open("GET",a);b.send(null);return b}function g(){if(!(!la||x<ja)){var a=C(O-aa,P-ma),c=C(O+L+aa,P+F+ma);ea&&ea.abort();ea=e(W(la,
{w:a[Z],n:a[Y],e:c[Z],s:c[Y],z:x}),l)}}function l(a){var c,b,d,f=[],h=0,i=0;ba=ja;I(x);ea=null;if(!(!a||a.meta.z!==x)){d=a.meta;b=a.data;if(s&&n&&s.z===d.z){h=s.x-d.x;i=s.y-d.y;a=0;for(c=n.length;a<c;a++)f[a]=n[a][G][0]+h+","+(n[a][G][1]+i)}s=d;n=[];a=0;for(c=b.length;a<c;a++){n[a]=b[a];n[a][J]=ha(n[a][J],va);d=n[a][G][0]+","+n[a][G][1];n[a][K]=!(f&&~f.indexOf(d))}E()}}function m(a,c){var b=[],d,f,h,i,j,p,o,k,q=na-x;d=0;for(f=a.length;d<f;d++){j=a[d];p=j[G];o=new ta(p.length);h=0;for(i=p.length-1;h<
i;h+=2){k=p[h+1];var y=ha(1,Ba(0,0.5-ya(za(Ca+ua*p[h]/180))/X/2));k={x:~~((k/360+0.5)*$),y:~~(y*$)};o[h]=k.x;o[h+1]=k.y}b[d]=[];b[d][J]=ha(j[J]>>q,va);b[d][G]=o;b[d][z]=j[z];b[d][K]=j[K]!==undefined?j[K]:c}return b}function u(a,c){if(typeof a==="object")D(a,!c);else{var b=ia.documentElement,d=ia.createElement("script");N.jsonpCallback=function(f){delete N.jsonpCallback;b.removeChild(d);D(f,!c)};b.insertBefore(d,b.lastChild).src=a.replace(/\{callback\}/,"jsonpCallback")}}function w(a,c,b){if(b===undefined)b=
[];var d,f,h,i=a[0]?a:a.features,j,p,o,k,q,y,Q=c?1:0,R=c?0:1;if(i){a=0;for(d=i.length;a<d;a++)w(i[a],c,b);return b}if(a.type==="Feature"){d=a.geometry;o=a.properties}if(d.type==="Polygon")j=[d.coordinates];if(d.type==="MultiPolygon")j=d.coordinates;if(j){c=o.height;if(o.color||o.wallColor)q=v.parse(o.color||o.wallColor);if(o.roofColor)y=v.parse(o.roofColor);a=0;for(d=j.length;a<d;a++){p=j[a][0];i=[];f=k=0;for(h=p.length;f<h;f++){i.push(p[f][Q],p[f][R]);k+=c||p[f][2]||0}if(k){f=[];f[J]=~~(k/p.length);
p=G;k=void 0;h=void 0;var A=void 0,S=void 0,fa=0,B=void 0,wa=void 0;B=0;for(wa=i.length-3;B<wa;B+=2){k=i[B];h=i[B+1];A=i[B+2];S=i[B+3];fa+=k*S-A*h}if((fa/2>0?"CW":"CCW")==="CW")i=i;else{k=[];for(h=i.length-2;h>=0;h-=2)k.push(i[h],i[h+1]);i=k}f[p]=i;if(q||y)f[z]=[q,y];if(o.isNew!==undefined)f[K]=o.isNew;b.push(f)}}}return b}function D(a,c){if(a){ca=w(a,c);ba=0;I(x);s={n:90,w:-180,s:-90,e:180,x:0,y:0,z:x};n=m(ca,true);E()}else{ca=null;H()}}function I(a){x=a;$=Ea<<x;M=1-(x-ba)*0.3/(na-ba)}function E(){da=
0;clearInterval(oa);oa=setInterval(function(){da+=0.1;if(da>1){clearInterval(oa);da=1;for(var a=0,c=n.length;a<c;a++)n[a][K]=0}H()},33)}function H(){r.clearRect(0,0,L,F);if(s&&n)if(!(x<ba||pa)){var a,c,b,d,f,h,i,j,p=O-s.x,o=P-s.y,k,q,y,Q,R,A,S,fa=qa.adjustAlpha(M)+"",B=(ra||qa.adjustLightness(1.2)).adjustAlpha(M)+"";if(ga)r.strokeStyle=Fa.adjustAlpha(M)+"";a=0;for(c=n.length;a<c;a++){f=n[a];q=false;h=f[G];k=[];b=0;for(d=h.length-1;b<d;b+=2){k[b]=i=h[b]-p;k[b+1]=j=h[b+1]-o;q||(q=i>0&&i<L&&j>0&&j<F)}if(q){r.fillStyle=
f[z]&&f[z][0]?f[z][0].adjustAlpha(M)+"":fa;b=f[K]?f[J]*da:f[J];h=ka/(ka-b);i=[];j=[];b=0;for(d=k.length-3;b<d;b+=2){q=k[b];y=k[b+1];Q=k[b+2];R=k[b+3];A={x:~~((q-T)*h+T)+0.5,y:~~((y-U)*h+U)+0.5};S={x:~~((Q-T)*h+T)+0.5,y:~~((R-U)*h+U)+0.5};if((Q-q)*(A.y-y)>(A.x-q)*(R-y)){if(!j.length){j.unshift(y+0.5);j.unshift(q+0.5);j.push(A.x,A.y)}j.unshift(R+0.5);j.unshift(Q+0.5);j.push(S.x,S.y)}else{sa(j);j=[]}i[b]=A.x;i[b+1]=A.y}sa(j);r.fillStyle=!f[z]?B:f[z][1]?f[z][1].adjustAlpha(M)+"":ra?B:f[z][0].adjustLightness(1.2).adjustAlpha(M)+
"";sa(i,ga)}}}}function sa(a,c){if(a.length){r.beginPath();r.moveTo(a[0],a[1]);for(var b=2,d=a.length;b<d;b+=2)r.lineTo(a[b],a[b+1]);r.closePath();c&&r.stroke();r.fill()}}var L=0,F=0,aa=0,ma=0,O=0,P=0,x,$,ea,t,r,la,ga,qa=new v(200,190,180),ra,Fa=new v(145,140,135),ca,s,n,M=1,da=1,oa,ba=ja,na=20,T,U,pa;this.setStyle=function(a){a=(a=a)||{};ga=a.strokeRoofs!==undefined?a.strokeRoofs:ga;if(a.color||a.wallColor)qa=v.parse(a.color||a.wallColor);if(a.roofColor!==undefined)ra=v.parse(a.roofColor);H();return this};
this.geoJSON=function(a,c){u(a,c);return this};this.setCamOffset=function(a,c){T=aa+a;U=F+c};this.setMaxZoom=function(a){na=a};this.createCanvas=function(a){t=ia.createElement("canvas");t.style.webkitTransform="translate3d(0,0,0)";t.style.imageRendering="optimizeSpeed";t.style.position="absolute";t.style.pointerEvents="none";t.style.left=0;t.style.top=0;a.appendChild(t);r=t.getContext("2d");r.lineCap="round";r.lineJoin="round";r.lineWidth=1;try{r.mozImageSmoothingEnabled=false}catch(c){}return t};
this.destroyCanvas=function(){t.parentNode.removeChild(t)};this.loadData=g;this.onMoveEnd=function(){var a=C(O,P),c=C(O+L,P+F);H();if(s&&(a[Y]>s.n||a[Z]<s.w||c[Y]<s.s||c[Z]>s.e))g()};this.onZoomEnd=function(a){pa=false;I(a.zoom);if(ca){n=m(ca);H()}else{H();g()}};this.onZoomStart=function(){pa=true;H()};this.render=H;this.setOrigin=function(a,c){O=a;P=c};this.setSize=function(a,c){L=a;F=c;aa=~~(L/2);ma=~~(F/2);T=aa;U=F;t.width=L;t.height=F};this.setZoom=I;la=V};N.OSMBuildings.VERSION="0.1.7a";N.OSMBuildings.ATTRIBUTION=
'&copy; <a href="http://osmbuildings.org">OSM Buildings</a>'})(this);
/*built on 2012-11-05  9:22:53.34*/ 
dojo.provide("agsjs.layers.ExtrudedFeatureLayer");
dojo.addOnLoad(function(){dojo.declare("agsjs.layers.ExtrudedFeatureLayer",esri.layers.Layer,{_osmb:null,_canvas:null,_tileInfo:null,_mode:0,_heightAttribute:"",_oidField:null,_query:null,_task:null,_oids:null,_featureExt:null,constructor:function(a,b){if(!document.createElement("canvas").getContext)throw new Error("Canvas unsupported. Try different browser");this.inherited(arguments);b=b||{};this._heightAttribute=b.heightAttribute;this._mode=b.mode||agsjs.layers.ExtrudedFeatureLayer.MODE_ONDEMAND;
this._heightScaleRatio=b.heightScaleRatio||1;this._extentScaleRatio=b.extentScaleRatio||1.5;this._defaultHeight=b.defaultHeight||0;this._style=b.style;if(dojo.isObject(a)&&a.featureSet){this._mode=agsjs.layers.ExtrudedFeatureLayer.MODE_SNAPSHOT;this._setFeatures(a.featureSet.features);this.loaded=true;this.onLoad(this)}else{this._url=a;(new esri.request({url:this._url,content:{f:"json"},callbackParamName:"callback"})).then(dojo.hitch(this,this._initLayer));this._query=new esri.tasks.Query;dojo.mixin(this._query,
b.query);dojo.mixin(this._query,{returnGeometry:true,outSpatialReference:{wkid:4326}});this._task=new esri.tasks.QueryTask(a);dojo.connect(this._task,"onComplete",dojo.hitch(this,this._onQueryComplete));dojo.connect(this._task,"onError",esri.config.defaults.io.errorHandler)}},_setMap:function(a,b){this._map=a;var c=dojo.create("div",{width:a.width+"px",height:a.height+"px",style:"position: absolute; left: 0px; top: 0px;"},b);this._osmb=new OSMBuildings;this.suspended=false;this.copyright=OSMBuildings.ATTRIBUTION+
","+this.copyrightText;this._element=c;this._canvas=this._osmb.createCanvas(c);this._osmb.setSize(a.width,a.height);if(a.layerIds.length==0||!a.getLayer(a.layerIds[0]).tileInfo)throw new Error("must have at least one tiled layer added before this layer");this._tileInfo=a.getLayer(a.layerIds[0]).tileInfo;this._osmb.setZoom(a.getLevel());this._setOrigin();this._loadData();this._connects=[];this._connects.push(dojo.connect(a,"onResize",this,this._onResize));this._connects.push(dojo.connect(a,"onPan",
this,this._onPan));this._connects.push(dojo.connect(a,"onExtentChange",this,this._onExtentChange));this._connects.push(dojo.connect(a,"onZoomStart",this,this._onZoomStart));return c},_unsetMap:function(a,b){this._osmb&&this._osmb.destroyCanvas();this._osmb=null;dojo.forEach(this._connects,dojo.disconnect,dojo);this._element&&b.removeChild(this._element);this._element=this._map=null},_initLayer:function(a){this.setMinScale(a.minScale||0);this.setMaxScale(a.maxScale||0);this.copyrightText=a.copyrightText;
dojo.some(a.fields,function(b){if(b.type=="esriFieldTypeOID"){this._oidField=b.name;return true}return false},this);this._query.outFields=[this._oidField,this._heightAttribute];this.loaded=true;this.onLoad(this)},_setOrigin:function(){var a=this._tileInfo.lods[this._map.getLevel()].resolution,b=this._map.toMap(new esri.geometry.Point(0,0));this._osmb.setOrigin(Math.round((b.x-this._tileInfo.origin.x)/a),Math.round((this._tileInfo.origin.y-b.y)/a));this._osmb.setSize(this._map.width,this._map.height)},
_onResize:function(a,b,c){if(this._osmb){this._osmb.setSize(b,c);this._osmb.render()}},_onPan:function(a,b){dojo.style(this._canvas,{left:b.x+"px",top:b.y+"px"});this._osmb.setCamOffset(-b.x,-b.y);this._osmb.render()},_onExtentChange:function(a,b,c){dojo.style(this._canvas,{left:"0px",top:"0px"});this._setOrigin();this._osmb.setCamOffset(0,0);if(c){this._osmb.onZoomEnd({zoom:this._map.getLevel()});this.isVisibleAtScale(this._map.getScale())?this._loadData():this._osmb.geoJSON({features:[]})}else{this._osmb.onMoveEnd();
this._featureExt&&!this._featureExt.contains(a)&&this._loadData()}},_onZoomStart:function(){this._osmb.onZoomStart()},_setFeatures:function(a){var b={},c=[];this._oids=this._oids||{};for(var d=0;d<a.length;d++){var e=a[d],f=e.attributes[this._oidField];c[d]={type:"Feature",geometry:{type:"Polygon",coordinates:e.geometry.rings},properties:{height:(e.attributes[this._heightAttribute]||this._defaultHeight)*this._heightScaleRatio,isNew:!this._oids[f]}};b[f]=e}this._oids=b;this._osmb.geoJSON({type:"FeatureCollection",
features:c});this._style&&this._osmb.setStyle(this._style)},_loadData:function(){if(this._mode==agsjs.layers.ExtrudedFeatureLayer.MODE_SNAPSHOT)if(this._oids)return;else{this._query.geometry=null;this._query.where=this._query.where||"1=1"}else{this._featureExt=this._map.extent.expand(this._extentScaleRatio);this._query.geometry=this._featureExt}this._task.execute(this._query)},_onQueryComplete:function(a){this._setFeatures(a.features)}});dojo.mixin(agsjs.layers.ExtrudedFeatureLayer,{MODE_ONDEMAND:0,
MODE_SNAPSHOT:1})});
