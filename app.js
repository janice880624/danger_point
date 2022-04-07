var messageBox; //訊息視窗物件
var pMap; //初始化地圖物件
//------------------------------須自行修改的參數,包含點位坐標,訊息視窗內容及圖示檔案來源設定------------------------------
var infotext = [
  "<B>臺北市政府",
  "<B>新北市政府",
]; //依序填入地標名稱及訊息視窗內容, 可自行增減數量
var markerPoint = [
  new TGOS.TGPoint(306954, 2770049),
  new TGOS.TGPoint(296991, 2767219),
  new TGOS.TGPoint(214192, 2673102),
  new TGOS.TGPoint(166459, 2543656),
  new TGOS.TGPoint(179269, 2502465),
]; //依序填入地標坐標位置, 坐標數須與標記數一致
var imgUrl = [
  "https://api.tgos.tw/TGOS_API/images/marker2.png",
  "https://api.tgos.tw/TGOS_API/images/marker2.png",
]; //依序設定標記點圖示來源

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
  pMap.setZoom(2); //初始地圖縮放層級
  //pMap.setCenter(中心點X坐標, 中心點Y坐標);	//初始地圖中心點

  for (var i = 0; i < infotext.length; i++) {
    //------------------建立標記點---------------------
    var markerImg = new TGOS.TGImage(
      imgUrl[i],
      new TGOS.TGSize(38, 33),
      new TGOS.TGPoint(0, 0),
      new TGOS.TGPoint(10, 33)
    ); //設定標記點圖片及尺寸大小
    var pTGMarker = new TGOS.TGMarker(pMap, markerPoint[i], "", markerImg, {
      flat: false,
    }); //建立機關單位標記點
    //-----------------建立訊息視窗--------------------
    var InfoWindowOptions = {
      maxWidth: 4000, //訊息視窗的最大寬度
      pixelOffset: new TGOS.TGSize(5, -30), //InfoWindow起始位置的偏移量, 使用TGSize設定, 向右X為正, 向上Y為負
    };

    messageBox = new TGOS.TGInfoWindow(
      infotext[i],
      markerPoint[i],
      InfoWindowOptions
    ); //建立訊息視窗
    TGOS.TGEvent.addListener(
      pTGMarker,
      "mouseover",
      (function (pTGMarker, messageBox) {
        return function () {
          messageBox.open(pMap, pTGMarker);
        };
      })(pTGMarker, messageBox)
    ); //滑鼠監聽事件--開啟訊息視窗

    TGOS.TGEvent.addListener(
      pTGMarker,
      "mouseout",
      (function (messageBox) {
        return function () {
          messageBox.close();
        };
      })(messageBox)
    );
  }
}
