﻿/*!@license
* Infragistics.Web.ClientUI infragistics.encoding.core.js 13.2.20132.2055
*
* Copyright (c) 2011-2013 Infragistics Inc.
*
* http://www.infragistics.com/
*
* Depends:
*     jquery-1.4.4.js
*     jquery.ui.core.js
*     jquery.ui.widget.js
*     infragistics.util.js
*/
$.ig=$.ig||{};$.ig.util.bulkDefine(["AbstractEnumerable","AbstractEnumerator","IEnumerable$1","ICollection$1","IList$1","IArrayList","List$1","Collection$1","IDictionary$2","Dictionary$2","GenericEnumerable$1","IEnumerator$1","GenericEnumerator$1","INotifyCollectionChanged","NotifyCollectionChangedEventHandler","NotifyCollectionChangedEventArgs","NotifyCollectionChangedAction","KeyValuePair$2","LinkedList$1","LinkedListNode$1","ObservableCollection$1","Queue$1","ReadOnlyCollection$1","ReadOnlyObservableCollection$1","NameValueCollection","Stack$1","ReverseArrayEnumerator$1","IComparer$1","Expression","MemberExpression","ParameterExpression","LambdaExpression","MethodCallExpression","IOrderedEnumerable$1","Queryable","Enumerable","SortedList$1","IGrouping$2","IArray","DependencyObject","Test","IQueryable","IQueryable$1","IQueryProvider","Activator","AggregateException","ArgumentException","ArgumentNullException","ArgumentOutOfRangeException","AsyncCompletedEventArgs","AsyncCompletedEventHandler","ListSortDirection","Convert","Environment","InvalidOperationException","Debug","IEquatable$1","BinaryReader","ICredentials","NetworkCredential","UploadStringCompletedEventHandler","UploadStringCompletedEventArgs","WebClient","WebHeaderCollection","FaultCode","FaultException","FaultException$1","FaultReason","StringBuilder","BinaryFileDownloader","NotImplementedException","Random","Encoding","UnicodeEncoding","UTF8Encoding","Task","Task$1","TaskCompletionSource$1","TaskFactory","TaskStatus","Tuple$2","Uri","JavaScriptSerializer","UIElement","UIElementCollection","FrameworkElement","Control","ContentControl","Panel","Canvas","Image","TextBlock","CornerRadius","DataTemplate","DataTemplatePassInfo","DataTemplateMeasureInfo","DataTemplateRenderInfo","DataTemplateRenderHandler","DataTemplateMeasureHandler","DataTemplatePassHandler","Binding","DependencyProperty","UnsetValue","DependencyPropertiesCollection","DependencyPropertyChangedEventArgs","Key","ModifierKeys","MouseEventArgs","MouseButtonEventArgs","Brush","LinearGradientBrush","GradientStop","Color","DoubleCollection","FillRule","GeometryType","Geometry","GeometryCollection","GeometryGroup","LineGeometry","RectangleGeometry","EllipseGeometry","PathGeometry","PathFigure","PathFigureCollection","PathSegmentType","PathSegment","PathSegmentCollection","LineSegment","BezierSegment","PolyBezierSegment","PolyLineSegment","ArcSegment","SweepDirection","HorizontalAlignment","PenLineCap","Stretch","Transform","RotateTransform","TranslateTransform","ScaleTransform","TransformGroup","TransformCollection","Thickness","VerticalAlignment","Point","PointCollection","PropertyChangedCallback","CoerceValueCallback","PropertyMetadata","PropertyPath","Rect","Shape","Line","Path","Polygon","Polyline","Rectangle","Size","Style","StyleTypedPropertyAttribute","TemplatePartAttribute","TemplateVisualStateAttribute","Visibility","XObject","XAttribute","XNode","XContainer","XDocument","XElement","XmlUtils","XName","XNamespace","Object","MulticastDelegate","Action","Action$1","Action$2","Action$3","Action$4","Action$5","Action$6","Action$7","Action$8","IEqualityComparer$1","IEnumerable","ICollection","IDictionary","IList","Array","Comparison$1","Attribute","BrowsableAttribute","EventArgs","CancelEventArgs","DesignTimeVisibleAttribute","EditorBrowsableAttribute","ValueType","Enum","EditorBrowsableState","ISupportInitialize","ITypeDescriptorContext","TypeConverter","TypeConverterAttribute","WinMDTypeAttribute","WinMDPropertyToObjectTypeAttribute","Error","IFormatProvider","NotSupportedException","ObsoleteAttribute","MemberInfo","MethodBase","ConstructorInfo","IComparable","Date","Number","SuppressMessageAttribute","EventHandler$1","PlaceholderSystemCollectionsObjectModel","PlaceholderSystemCollectionsSpecialized","PlaceholderSystemWindows","PlaceholderSystemWindowsControls","PlaceholderSystemWindowsData","PlaceholderSystemWindowsInput","PlaceholderSystemWindowsMarkup","PlaceholderSystemWindowsMediaImaging","PlaceholderSystemWindowsShapes","PlaceholderSystemWindowsControlsPrimitives","PlaceholderSystemWindowsAutomation","PlaceholderSystemWindowsAutomationPeers","PlaceholderSystemText","PlaceholderSystemGlobalization","PlaceholderSystemWindowsDocuments","PlaceholderSystemWindowsInk","PlaceholderSystemWindowsMediaAnimation","PlaceholderSystemWindowsMediaEffects","PlaceholderSystemWindowsThreading","PlaceholderInfragisticsControlerChartsAutomationPeers","FlagsAttribute","Func$1","Func$2","Func$3","Func$4","Func$5","Func$6","Func$7","Func$8","Func$9","Math","XMLHttpRequest","Nullable$1","Nullable","ParamArrayAttribute","AttributeTargets","AttributeUsageAttribute","Boolean","String","CompareCallback","Dictionary","DictionaryEntry","IEnumerator","INotifyPropertyChanged","PropertyChangedEventArgs","PropertyChangedEventHandler","CultureInfo","Delegate","IDisposable","IntPtr","ReflectionUtil","AssemblyTitleAttribute","AssemblyCompanyAttribute","AssemblyConfigurationAttribute","AssemblyCopyrightAttribute","AssemblyCultureAttribute","AssemblyDescriptionAttribute","AssemblyFileVersionAttribute","AssemblyProductAttribute","AssemblyTrademarkAttribute","AssemblyVersionAttribute","DefaultMemberAttribute","MethodInfo","ParameterInfo","PropertyInfo","RegExp","RuntimeFieldHandle","RuntimeTypeHandle","ClientScriptAttribute","ClientNameAttribute","DontObfuscateAttribute","EmitIgnoreTypeAttribute","ExtensionAttribute","GlobalMemberAttribute","IgnoreAttribute","InlineItemAccessAttribute","InlinePropertyAttribute","InternalsVisibleToAttribute","KeepOriginalNameAttribute","LiteralStringAttribute","NativeMethodAttribute","NativePropertyAttribute","NativeTypeAttribute","RuntimeHelpers","WeakAttribute","WidgetAttribute","MainWidgetAttribute","SuppressWidgetMemberAttribute","SuppressWidgetMemberCopyAttribute","WidgetDefaultStringAttribute","WidgetDefaultNumberAttribute","WidgetDefaultBooleanAttribute","MvcEnumSetStringEnumAttribute","WidgetModuleAttribute","WidgetModuleParentAttribute","WidgetIgnoreDependsAttribute","WidgetIncludeDependsAttribute","WidgetModuleExclusionParentAttribute","ComVisibleAttribute","GuidAttribute","OutAttribute","DataContractAttribute","DataMemberAttribute","WaitHandle","EventWaitHandle","Monitor","TypeCode","TargetFrameworkAttribute","Script","Single","ManualResetEvent","Thread","Type","UIntPtr","XmlAttributeAttribute","XmlElementAttribute","XmlEnumAttribute","XmlIgnoreAttribute","XmlRootAttribute","XmlTypeAttribute","XmlNode","XmlAttribute","XmlDocument","XmlDocumentParser","XmlLinkedNode","XmlElement","Void","XmlNodeList","XmlNamedNodeMap","XmlNodeType","XmlSchemaForm","Element","CanvasElement","console","DivElement","Document","ElementAttribute","ElementAttributeCollection","ElementCollection","ElementEventHandler","ElementNodeType","EventListener","IElementEventHandler","ImageElement","CanvasContext","CanvasContext2D","ImageData","Gradient","TextMetrics","MSGesture","WebStyle","window","Callback","JQuery","JQueryDeferred","JQueryEvent","JQueryObject","JQueryCallback","JQueryUICallback","JQueryPosition","JQueryPromise"]);$.ig.util.defType("AbstractEnumerable","Object",{a:null,init:function(a){$.ig.Object.prototype.init.call(this);this.a=a},getEnumerator:function(){return new $.ig.AbstractEnumerator(this.a().getEnumerator())},$type:new $.ig.Type("AbstractEnumerable",$.ig.Object.prototype.$type,[$.ig.IEnumerable.prototype.$type])},true);$.ig.util.defType("AbstractEnumerator","Object",{a:null,init:function(a){$.ig.Object.prototype.init.call(this);this.a=a},current:function(){return this.a.current()},moveNext:function(){return this.a.moveNext()},reset:function(){this.a.reset()},$type:new $.ig.Type("AbstractEnumerator",$.ig.Object.prototype.$type,[$.ig.IEnumerator.prototype.$type])},true);$.ig.util.defType("IEnumerable$1","Object",{$type:new $.ig.Type("IEnumerable$1",null,[$.ig.IEnumerable.prototype.$type])},true);$.ig.util.defType("Dictionary$2","Object",{$tKey:null,$tValue:null,__inner:null,__keys:null,init:function($tKey,$tValue,initNumber){if(initNumber>0){switch(initNumber){case 1:this.init1.apply(this,arguments);break;case 2:this.init2.apply(this,arguments);break}return}this.a=null;this._useToString=false;this.b=false;this._needsEnsure=false;this.$tKey=$tKey;this.$tValue=$tValue;this.$type=this.$type.specialize(this.$tKey,this.$tValue);$.ig.Object.prototype.init.call(this);this.__inner=new $.ig.Dictionary(0);this.__keys=new $.ig.Dictionary(0)},init1:function($tKey,$tValue,initNumber,a){this.a=null;this._useToString=false;this.b=false;this._needsEnsure=false;this.$tKey=$tKey;this.$tValue=$tValue;this.$type=this.$type.specialize(this.$tKey,this.$tValue);$.ig.Object.prototype.init.call(this);this.__inner=new $.ig.Dictionary(1,a);this.__keys=new $.ig.Dictionary(0)},a:null,init2:function($tKey,$tValue,initNumber,a){this.a=null;this._useToString=false;this.b=false;this._needsEnsure=false;this.$tKey=$tKey;this.$tValue=$tValue;this.$type=this.$type.specialize(this.$tKey,this.$tValue);$.ig.Object.prototype.init.call(this);this.__inner=new $.ig.Dictionary(0);this.__keys=new $.ig.Dictionary(0);this.a=a},count:function(){return this.__inner.count()},item:function(b,a){if(arguments.length===2){this.__inner.item(this.f(b),a);this.__keys.item(this.f(b),b);return a}else{return this.__inner.item(this.f(b))}},c:function(){return this.__inner.length()},containsKey:function(a){return this.__inner.containsKey(this.f(a))},remove:function(a){var b=this.f(a);if(!this.__keys.containsKey(b)){return false}this.__inner.remove(b);this.__keys.remove(b);return true},clear:function(){this.__inner.clear();this.__keys.clear()},_useToString:null,b:null,_needsEnsure:null,e:function(key_){if(!this.b){this.b=true;this._needsEnsure=typeof key_=="object";if(!this._needsEnsure){this._useToString=!key_.getHashCode}}},f:function(key_){this.e(key_);if(this._needsEnsure){$.ig.util.ensureUniqueId(key_)}if(this.a!=null){return this.a.getHashCode(key_).toString()}if(this._useToString){return key_.toString()}else{return key_.getHashCode().toString()}},add:function(a,b){this.__inner.item(this.f(a),b);this.__keys.item(this.f(a),a)},tryGetValue:function(a,b){if(!this.__inner.containsKey(this.f(a))){b=null;return{ret:false,value:b}}b=this.__inner.item(this.f(a));return{ret:true,value:b};return{value:b}},keys:function(){var $self=this;var $iter=function(){return function(){return{$state:0,$this:$self,$current:null,getEnumerator:function(){if(this.$state===-1){this.$state=0}return this},current:function(){return this.$current},moveNext:function(){do{switch(this.$state){case 0:this.$state=1;break;case 1:this.$c=this.$this.__keys.values().getEnumerator();this.$state=4;break;case 2:this.$b=this.$c.current();this.$current=this.$b;this.$state=3;return true;case 3:this.$state=4;break;case 4:if(this.$c.moveNext()){this.$state=2}else{this.$state=5}break;case 5:this.$state=-2;break;case-2:return false}}while(this.$state>0)}}}()};return new $.ig.GenericEnumerable$1(this.$tKey,$iter)},values:function(){var $self=this;var $iter=function(){return function(){return{$state:0,$this:$self,$current:null,getEnumerator:function(){if(this.$state===-1){this.$state=0}return this},current:function(){return this.$current},moveNext:function(){do{switch(this.$state){case 0:this.$state=1;break;case 1:this.$c=this.$this.__inner.values().getEnumerator();this.$state=4;break;case 2:this.$b=this.$c.current();this.$current=this.$b;this.$state=3;return true;case 3:this.$state=4;break;case 4:if(this.$c.moveNext()){this.$state=2}else{this.$state=5}break;case 5:this.$state=-2;break;case-2:return false}}while(this.$state>0)}}}()};return new $.ig.GenericEnumerable$1(this.$tValue,$iter)},isReadOnly:function(){return false},add1:function(a){this.add(a.key(),a.value())},contains:function(a){return this.containsKey(a.key())},g:function(a,b){throw new $.ig.NotImplementedException},remove1:function(a){this.remove(a.key());return true},h:function(){var $self=this;var $iter=function(){return function(){return{$state:0,$this:$self,$current:null,getEnumerator:function(){if(this.$state===-1){this.$state=0}return this},current:function(){return this.$current},moveNext:function(){do{switch(this.$state){case 0:this.$state=1;break;case 1:this.$b=this.$this.__keys.values().getEnumerator();this.$state=4;break;case 2:this.$a=this.$b.current();this.$current=new $.ig.KeyValuePair$2(this.$tKey,this.$tValue,this.$a,this.$this.__inner.item(this.$this.f(this.$a)));this.$state=3;return true;case 3:this.$state=4;break;case 4:if(this.$b.moveNext()){this.$state=2}else{this.$state=5}break;case 5:this.$state=-2;break;case-2:return false}}while(this.$state>0)}}}()};return new $.ig.GenericEnumerable$1($.ig.KeyValuePair$2.prototype.$type.specialize(this.$tKey,this.$tValue),$iter)},getEnumerator:function(){return this.h().getEnumerator()},$type:new $.ig.Type("Dictionary$2",$.ig.Object.prototype.$type,[$.ig.IDictionary$2.prototype.$type.specialize(0,1),$.ig.IDictionary.prototype.$type])},true);$.ig.util.defType("GenericEnumerable$1","Object",{$t:null,a:null,init:function($t,a){this.$t=$t;this.$type=this.$type.specialize(this.$t);$.ig.Object.prototype.init.call(this);this.a=a},getEnumerator:function(){return new $.ig.GenericEnumerator$1(this.$t,this.a().getEnumerator())},$type:new $.ig.Type("GenericEnumerable$1",$.ig.Object.prototype.$type,[$.ig.IEnumerable$1.prototype.$type.specialize(0)])},true);$.ig.util.defType("IEnumerator$1","Object",{$type:new $.ig.Type("IEnumerator$1",null,[$.ig.IEnumerator.prototype.$type])},true);$.ig.util.defType("GenericEnumerator$1","Object",{$t:null,a:null,init:function($t,a){this.$t=$t;this.$type=this.$type.specialize(this.$t);$.ig.Object.prototype.init.call(this);this.a=a},current:function(){return this.a.current()},moveNext:function(){return this.a.moveNext()},reset:function(){this.a.reset()},$type:new $.ig.Type("GenericEnumerator$1",$.ig.Object.prototype.$type,[$.ig.IEnumerator$1.prototype.$type.specialize(0)])},true);$.ig.util.defType("KeyValuePair$2","ValueType",{$tKey:null,$tValue:null,a:null,b:null,init:function($tKey,$tValue,a,b){this.$tKey=$tKey;this.$tValue=$tValue;this.$type=this.$type.specialize(this.$tKey,this.$tValue);$.ig.ValueType.prototype.init.call(this);this.a=a;this.b=b},key:function(){return this.a},value:function(){return this.b},$type:new $.ig.Type("KeyValuePair$2",$.ig.Object.prototype.$type)},true);$.ig.util.defType("ArgumentNullException","Error",{init:function(a){$.ig.Error.prototype.init1.call(this,1,a+" cannot be null.")},$type:new $.ig.Type("ArgumentNullException",$.ig.Error.prototype.$type)},true);$.ig.util.defType("StringBuilder","Object",{_internal:null,internal:function(a){if(arguments.length===1){this._internal=a;return a}else{return this._internal}},init:function(){$.ig.Object.prototype.init.call(this);this._internal=[]},d:function(str_){this._internal.push(str_);return this},e:function(a){var str_=a.toString();this._internal.push(str_);return this},f:function(chr_){this._internal.push(chr_);return this},g:function(str_){this._internal.push(str_+String.fromCharCode(10));return this},h:function(index_,chr_){this._internal.splice(index_,0,chr_);return this},i:function(index_,str_){this._internal.splice(index_,0,str_);return this},j:function(startIndex_,length_){this._internal.splice(startIndex_,length_);return this},toString:function(){return this._internal.join("")},$type:new $.ig.Type("StringBuilder",$.ig.Object.prototype.$type)},true);$.ig.util.defType("NotImplementedException","Error",{init:function(){$.ig.Error.prototype.init1.call(this,1,"not implemented")},$type:new $.ig.Type("NotImplementedException",$.ig.Error.prototype.$type)},true);$.ig.util.defType("Encoding","Object",{init:function(){$.ig.Object.prototype.init.call(this)},a:null,uTF8:function(){if($.ig.Encoding.prototype.a==null){$.ig.Encoding.prototype.a=new $.ig.UTF8Encoding}return $.ig.Encoding.prototype.a},b:null,unicode:function(){if($.ig.Encoding.prototype.b==null){$.ig.Encoding.prototype.b=new $.ig.UnicodeEncoding}return $.ig.Encoding.prototype.b},getString:function(a,b,c){return""},getBytes:function(a,b,c,d,e){},getBytes1:function(a,b,c){var d=new Array(this.getByteCount(a,b,c));this.getBytes(a,b,c,d,0);return d},getBytes2:function(a){if(a==null){throw new $.ig.ArgumentNullException("input")}var b=new Array(a.length);for(var c=0;c<a.length;c++){b[c]=a.charAt(c)}return this.getBytes1(b,0,b.length)},getByteCount:function(a,b,c){},$type:new $.ig.Type("Encoding",$.ig.Object.prototype.$type)},true);$.ig.util.defType("UnicodeEncoding","Encoding",{init:function(){$.ig.Encoding.prototype.init.call(this)},getString:function(bytes_,a,b){var c="";for(var i_=a;i_<b;i_=i_+2){if(bytes_[i_]==0){break}if(i_+1>=b){c=c+"�"}else{var d=bytes_[i_].toString(16);var e=bytes_[i_+1].toString(16);var f=$.ig.Number.prototype.parseInt(e+d,16);c=c+String.fromCharCode(f)}}return c},getByteCount:function(a,b,c){return 0},getBytes:function(a,b,c,d,e){return 0},getBytes1:function(a,b,c){return $.ig.Encoding.prototype.getBytes1.call(this,a,b,c)},getBytes2:function(input_){var a=new Array(input_.length*2);for(var i_=0;i_<input_.length;i_++){var hex_=input_.charCodeAt(i_).toString(16).padLeft(4,"0");a[2*i_]=$.ig.Number.prototype.parseInt(hex_.substr(2),16);a[2*i_+1]=$.ig.Number.prototype.parseInt(hex_.substr(0,2),16)}return a},$type:new $.ig.Type("UnicodeEncoding",$.ig.Encoding.prototype.$type)},true);$.ig.util.defType("UTF8Encoding","Encoding",{init:function(){$.ig.Encoding.prototype.init.call(this)},getString:function(bytes_,a,b){var ret_="";for(var i_=a;i_<b;i_++){if(bytes_[i_]==0){break}ret_=ret_+String.fromCharCode(bytes_[i_])}ret_=decodeURIComponent(escape(ret_));return ret_},getByteCount:function(a,b,c){return 0},getBytes:function(a,b,c,d,e){return 0},getBytes1:function(a,b,c){return $.ig.Encoding.prototype.getBytes1.call(this,a,b,c)},getBytes2:function(input_){var a=new Array(input_.length);var inputUTF8_=unescape(encodeURIComponent(input_));for(var i_=0;i_<inputUTF8_.length;i_++){a[i_]=inputUTF8_.charCodeAt(i_)}return a},$type:new $.ig.Type("UTF8Encoding",$.ig.Encoding.prototype.$type)},true);$.ig.util.extCopy($.ig.Queryable,[[[$.ig.AbstractEnumerable,$.ig.IEnumerable$1,$.ig.ICollection$1,$.ig.IList$1,$.ig.List$1,$.ig.IDictionary$2,$.ig.Dictionary$2,$.ig.GenericEnumerable$1,$.ig.ReadOnlyCollection$1,$.ig.Stack$1,$.ig.IOrderedEnumerable$1,$.ig.SortedList$1,$.ig.IGrouping$2,$.ig.ICollection,$.ig.IList,$.ig.Array,$.ig.Dictionary,$.ig.XmlNodeList,$.ig.XmlNamedNodeMap],["asQueryable"]]]);$.ig.util.extCopy($.ig.Enumerable,[[[$.ig.ICollection$1,$.ig.IList$1,$.ig.List$1,$.ig.IDictionary$2,$.ig.Dictionary$2,$.ig.GenericEnumerable$1,$.ig.ReadOnlyCollection$1,$.ig.Stack$1,$.ig.IOrderedEnumerable$1,$.ig.SortedList$1,$.ig.IGrouping$2,$.ig.IEnumerable$1],["where$1","where$11111","select$2","selectMany$2","last$1","first$1","firstOrDefault$1","orderBy$2","orderByDescending$2","toList$1","concat$1","max","max$111","min","min$111","count$1","reverse$1","take$1","skip$1","any$1","contains$1","union$1","toArray$1","elementAt$1","sum","sum$111"]],[[$.ig.AbstractEnumerable,$.ig.IEnumerable$1,$.ig.ICollection$1,$.ig.IList$1,$.ig.List$1,$.ig.IDictionary$2,$.ig.Dictionary$2,$.ig.GenericEnumerable$1,$.ig.ReadOnlyCollection$1,$.ig.Stack$1,$.ig.IOrderedEnumerable$1,$.ig.SortedList$1,$.ig.IGrouping$2,$.ig.ICollection,$.ig.IList,$.ig.Array,$.ig.Dictionary,$.ig.XmlNodeList,$.ig.XmlNamedNodeMap],["ofType$1","cast$1"]]]);$.ig=$.ig||{};$.ig.util.bulkDefine(["IEncoding","DoubleByteEncoding","SingleByteEncoding","Big5Encoding","Big5EncodingExtended","Big5EncodingExtended2","CodePage437Encoding","Iso8859Dash1","Iso8859Dash11","Iso8859Dash13","Iso8859Dash15","Iso8859Dash2","Iso8859Dash3","Iso8859Dash4","Iso8859Dash5","Iso8859Dash6","Iso8859Dash7","Iso8859Dash8","Iso8859Dash9","Ksc5601Encoding","Ksc5601EncodingExtended","Ksc5601EncodingExtended2","Ksc5601EncodingExtended3","UsAsciiEncoding","Windows1250Encoding","Windows1251Encoding","Windows1252Encoding","Windows1256Encoding","Windows932Encoding","Windows932EncodingExtended","Windows936Encoding","Windows936EncodingExtended","Windows936EncodingExtended2","Windows936EncodingExtended3"]);