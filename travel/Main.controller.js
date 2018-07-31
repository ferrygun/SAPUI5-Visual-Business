sap.ui.define([
           	"sap/ui/vbdemos/component/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.vbdemos.travel.Main", {
			onInit: function() {
				var oModel = new sap.ui.model.json.JSONModel();
				var oController = this;
				this.getView().setModel(oModel);

				this.geoMap = this.getView().byId(this.createId("VBITravel"));

				var conf = { "MapProvider":
					[
						{
							"type" : "",
							"name" : "BING",
							"description" : "Bing",
							"tileX" : "256",
							"tileY" : "256",
							"minLOD" : "0",
							"maxLOD" : "19",
							"copyright" : "Microsoft Corp.",
							"Source" : [{
								"id" : "1",
								"url" : "http://ecn.t0.tiles.virtualearth.net/tiles/r{QUAD}?g=685&&shading=hill"
								}
							]
						}
					],
					"MapLayerStacks":   
					[
						{  
							"name": "Default",
							"MapLayer":
								[
									{  
										"name": "layer1",
										"refMapProvider": "BING",
										"opacity": "1.0",
										"colBkgnd": "RGB(255,255,255)"
									}
								]
						}
					]
				};

				this.geoMap.setMapConfiguration(conf);

				$.getJSON("travel/cars.json", function(data) {
					oModel.setData(data);
					var oContext = oModel.getContext("/timeentries/0");
					oController.getView().setBindingContext(oContext);
				});
				
			},
//			onSlide : function(oEv) {
//				sap.m.MessageToast.show("slide");
//			},
			onLiveSlide : function(oEv) {
				var oModel = this.getView().getModel();
				var iSelectValue = oEv.getParameter("value");
				var oContext = oModel.getContext("/timeentries/"+iSelectValue);
				
				this.getView().setBindingContext(oContext);
			//	sap.m.MessageToast.show("liveslide");
			}
	});

});