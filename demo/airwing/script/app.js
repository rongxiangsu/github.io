var url = 'http://localhost:8080/geoserver/surong/wms';//nurc为GeoServer中的工作区名字
var layername = "surong:new_qwqdasdasd";//数据源的名字


var raster = new ol.layer.Tile({
    //source: new ol.source.MapQuest({layer: 'sat'})//raster为世界地图，有三种地图形式：hyb,osm,sat
    source: new ol.source.BingMaps({
        key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
        imagerySet: 'AerialWithLabels'
    })
});

var source = new ol.source.Vector();//绘制的线、面所在的图层
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33'
            })
        })
    })
});

var wgs84Sphere = new ol.Sphere(6378137);
var format = 'image/png';

var x = ol.proj.transform([-119.53757028855021, 49.11552618297184], 'EPSG:4326', 'EPSG:3857');
var y = ol.proj.transform([-119.53008323060207, 49.11954237150058], 'EPSG:4326', 'EPSG:3857');
var bounds = [x[0], x[1], y[0], y[1]];


var untiled = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: url,
        params: {
            'FORMAT': format,
            'VERSION': '1.3.0',
            LAYERS: layername
        }
    })
});

console.log(untiled.getExtent());
//
//var projection = new ol.proj.Projection({
//    code: 'EPSG:4326',
//    units: 'degrees',
//    axisOrientation: 'neu'
//});
var map = new ol.Map({
    controls: ol.control.defaults().extend([
        new ol.control.FullScreen()
    ]),
    target: 'map',
    layers: [
        raster,
        untiled,
        vector
    ]
});

map.getView().fit(bounds, map.getSize());

$(".form-inline").hide();
$("#btn-measure").click(function () {
    $(".form-inline").show();
    addInteraction();
});

$("#btn-measureclear").click(function () {
    removeToolTips();
    $(".ol-overlay-container").hide();
    $(".ol-overlay-container:contains('Click')").show();
});
$("#btn-measureclose").click(function () {
    $(".form-inline").hide();
    removeToolTips();
    $(".ol-overlay-container").hide();
    map.removeInteraction(draw);
});

function removeToolTips() {
    var vac = vector.getSource().getFeatures();
    var i = 0;
    for (; i < vac.length; i++) {
        vector.getSource().removeFeature(vac[i]);
    }
}

map.on("click", function (e) {
    var coor = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
    $("#lot").val(coor[0]);
    $("#lat").val(coor[1]);
});

$("#btn-1").click(function () {
    var lat11 = parseFloat($("#lat").val());
    var lon11 = parseFloat($("#lot").val());
    aaa = [lon11,lat11];
    var aaa = ol.proj.transform([lon11,lat11], 'EPSG:4326', 'EPSG:3857');
    map.getView().setCenter(aaa);
    map.getView().setZoom(16);
});