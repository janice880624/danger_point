var messageBox; //訊息視窗物件
var pMap; //初始化地圖物件

//------------------------------須自行修改的參數,包含點位坐標,訊息視窗內容及圖示檔案來源設定------------------------------

var infotext = "xxx"; //地標名稱及訊息視窗內容

var markerPoint = new TGOS.TGPoint(298797.846, 2780810.267); //地標坐標位置
var markerPoint2 = new TGOS.TGPoint(305575.961, 2774763.395); //北投會館

var imgUrl = "http://api.tgos.tw/TGOS_API/images/marker2.png"; //標記點圖示來源

window.Proj4js = {
  Proj: function (code) {
    return proj4(Proj4js.defs);
  },
  defs: proj4.defs,
  transform: proj4,
};

// 座標轉換
Proj4js.defs([
  [
    "EPSG:4326",
    "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees",
  ],
  [
    "EPSG:3826",
    "+title=TWD97 TM2+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +units=公尺 +no_defs",
  ],
  [
    "EPSG:3828",
    "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=aust_SA +towgs84=-752,-358,-179,-0.0000011698,0.0000018398,0.0000009822,0.00002329 +units=m +no_defs",
  ],
]);

var EPSG3826 = new proj4.Proj("EPSG:3826"); //TWD97 121分帶
var EPSG4326 = new proj4.Proj("EPSG:4326"); //WGS84

//------------------------------若網頁介面依照範例網頁的預設設定,以下程式碼可不修改---------------------------------------
function InitWnd() {
  //------------------初始化地圖--------------------

var pOMap = document.getElementById("OMap");

var mapOptiions = {
  scaleControl: false, //不顯示比例尺
  navigationControl: true, //顯示地圖縮放控制項
  navigationControlOptions: {
    //設定地圖縮放控制項
    controlPosition: TGOS.TGControlPosition.TOP_LEFT, //控制項位置
    navigationControlStyle: TGOS.TGNavigationControlStyle.SMALL, //控制項樣式
  },
  mapTypeControl: false, //不顯示地圖類型控制項
};

pMap = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826, mapOptiions); //建立地圖,選擇TWD97坐標
pMap.setZoom(11); //初始地圖縮放層級
pMap.setCenter(markerPoint);

// -------------------------------------------------------------------------------------
// TWD97坐標

//------------------建立標記點---------------------

var markerImg = new TGOS.TGImage(
  imgUrl,
  new TGOS.TGSize(38, 33),
  new TGOS.TGPoint(0, 0),
  new TGOS.TGPoint(10, 33)
); //設定標記點圖片及尺寸大小

var pTGMarker = new TGOS.TGMarker(pMap, markerPoint, "", markerImg); 
var pTGMarker = new TGOS.TGMarker(pMap, markerPoint2, "", markerImg); 

//-----------------建立訊息視窗--------------------

var InfoWindowOptions = {
  maxWidth: 4000, //訊息視窗的最大寬度
  pixelOffset: new TGOS.TGSize(5, -30), //InfoWindow起始位置的偏移量, 使用TGSize設定, 向右X為正, 向上Y為負
  zIndex: 99, //視窗堆疊順序
};

messageBox = new TGOS.TGInfoWindow(infotext, markerPoint, InfoWindowOptions); //建立訊息視窗
  TGOS.TGEvent.addListener(pTGMarker, "mouseover", openInfoWindow); //滑鼠監聽事件--開啟訊息視窗
  TGOS.TGEvent.addListener(pTGMarker, "mouseout", closeInfoWindow); //滑鼠監聽事件--關閉訊息視窗
}

function openInfoWindow() {
  //開啟訊息視窗函式
  messageBox.open(pMap);
}

function closeInfoWindow() {
  //關閉訊息視窗函式
  messageBox.close();
}
