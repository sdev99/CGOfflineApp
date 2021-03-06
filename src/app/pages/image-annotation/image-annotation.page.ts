import { Component, ElementRef, OnInit } from "@angular/core";
import { fabric } from "fabric";
import {
  NavController,
  AlertController,
  IonRouterOutlet,
} from "@ionic/angular";
import { SharedDataService } from "../../services/shared-data.service";
import { ObservablesService } from "../../services/observables.service";
import { ScreenOrientation } from "@ionic-native/screen-orientation/ngx";
import { StaticDataService } from "../../services/static-data.service";
import { TranslateService } from "@ngx-translate/core";
import { UtilService } from "src/app/services/util.service";

fabric.LineArrow = fabric.util.createClass(fabric.Line, {
  type: "LineArrow",

  initialize: function (element, options) {
    options || (options = {});
    this.callSuper("initialize", element, options);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"));
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);

    // do not render if width/height are zeros or object is not visible
    if ((this.width === 0 && this.height === 0) || !this.visible) {
      return;
    }

    ctx.save();

    var xDiff = this.x2 - this.x1;
    var yDiff = this.y2 - this.y1;
    var angle = Math.atan2(yDiff, xDiff);
    ctx.translate((this.x2 - this.x1) / 2, (this.y2 - this.y1) / 2);
    ctx.rotate(angle);
    ctx.beginPath();
    //move 10px in front of line to start the arrow so it does not have the square line end showing in front (0,0)
    ctx.moveTo(5, 0);

    // ctx.lineTo(-0, 70);
    // ctx.lineTo(-0, -70);

    ctx.lineTo(-20, 15);
    ctx.lineTo(-20, -15);

    ctx.closePath();
    ctx.fillStyle = this.stroke;
    ctx.fill();
    ctx.restore();
  },

  clipTo: function () {
    var ctx = arguments[0];
    this._render(ctx);
  },
});
fabric.ArrowLine = fabric.util.createClass(fabric.Polyline, {
  type: "ArrowLine",

  initialize: function (element, options) {
    options || (options = {});
    this.callSuper("initialize", element, options);
  },

  toObject: function () {
    return fabric.util.object.extend(this.callSuper("toObject"));
  },

  _render: function (ctx) {
    this.callSuper("_render", ctx);
  },
});

fabric.LineArrow.async = true;
fabric.ArrowLine.async = true;

@Component({
  selector: "app-image-annotation",
  templateUrl: "./image-annotation.page.html",
  styleUrls: ["./image-annotation.page.scss"],
})
export class ImageAnnotationPage implements OnInit {
  // Elements refrencea
  canvasRef;

  // UI variables
  isColorThicknessViewOpen = false;
  rangeValue = 1;

  imageMultiplier = 1;

  // Default values
  defaultThickness = 3;
  defaultFontSize = 26;
  defaultColor;

  renderColorPickerView: boolean = true;
  resizeTimeoutForColorPickerRerender: any = null;

  constructor(
    private routerOutlet: IonRouterOutlet,
    public navCtrl: NavController,
    public sharedDataService: SharedDataService,
    public alertController: AlertController,
    public observablesService: ObservablesService,
    private screenOrientation: ScreenOrientation,
    private translateService: TranslateService
  ) {
    this.defaultColor = sharedDataService.annotationColor;
  }

  ngOnInit() {
    this.canvasRef = new fabric.Canvas("c");

    setTimeout(() => {
      this.initialise();
    }, 200);
  }

  ionViewDidEnter(): void {
    this.routerOutlet.swipeGesture = false;
    this.customiseControl();
  }

  ionViewWillLeave = () => {
    this.routerOutlet.swipeGesture = true;
    this.canvasRef = null;
  };

  initialise() {
    let devicePixelRatio = 1;
    if (UtilService.isWebApp()) {
      devicePixelRatio =
        window.devicePixelRatio > 1 ? 1 : window.devicePixelRatio;
    }

    const content = document.getElementById("content");
    // Set canvas full screen size
    this.canvasRef.setDimensions({
      width: window.innerWidth,
      height: content.offsetHeight,
    });

    // const imgURL = './assets/images/demo1.png';
    const annotationImage = this.sharedDataService.getAnnotationImage();
    let imgURL = "";
    if (typeof annotationImage === "object" && annotationImage.dataUrl) {
      imgURL = annotationImage.dataUrl;
    } else {
      imgURL = annotationImage;
    }

    fabric.Image.fromURL(imgURL, (img) => {
      this.canvasRef.add(img);
      const aspectRatio = img.width / img.height;

      let imgWidth = img.width;
      let imgHeight = img.height;

      // If image size is less then available screen size
      if (imgWidth < window.innerWidth && imgHeight < content.offsetHeight) {
        if (imgWidth < window.innerWidth) {
          imgWidth = window.innerWidth;
          imgHeight = window.innerWidth / aspectRatio;
        }

        if (imgHeight < content.offsetHeight) {
          imgWidth = content.offsetHeight * aspectRatio;
          imgHeight = content.offsetHeight;
        }
      }

      // If image size is greater then available screen size
      if (imgWidth > window.innerWidth || imgHeight > content.offsetHeight) {
        if (imgWidth > window.innerWidth) {
          imgWidth = window.innerWidth;
          imgHeight = window.innerWidth / aspectRatio;
        }

        if (imgHeight > content.offsetHeight) {
          imgWidth = content.offsetHeight * aspectRatio;
          imgHeight = content.offsetHeight;
        }
      }

      const left = (window.innerWidth - imgWidth) / 2;
      const top = (content.offsetHeight - imgHeight) / 2;

      img.set({
        left: 0,
        top: 0,
        selectable: false,
      });

      // Calculate Image Multipler for Output image
      if (img.height > StaticDataService.photoMaxHeight) {
        this.imageMultiplier = StaticDataService.photoMaxHeight / imgHeight;
      } else {
        this.imageMultiplier = img.height / imgHeight;
      }

      img.scale(imgWidth / img.width);
      // img.scaleToWidth(imgWidth);
      // img.scaleToHeight(imgHeight);

      const canvasRef = this.canvasRef;
      canvasRef.cacheCanvasEl.style.top = top + "px";

      this.canvasRef.setDimensions({
        width: imgWidth * devicePixelRatio,
        height: imgHeight * devicePixelRatio,
      });
      this.canvasRef.renderAll();
    });

    this.canvasRef.on("selection:created", () => {
      this.isColorThicknessViewOpen = true;
    });

    this.canvasRef.on("selection:cleared", () => {
      this.isColorThicknessViewOpen = false;
    });

    if (UtilService.isWebApp()) {
      window.onresize = () => {
        if (this.isColorThicknessViewOpen) {
          this.renderColorPickerView = false;
          if (this.resizeTimeoutForColorPickerRerender) {
            clearTimeout(this.resizeTimeoutForColorPickerRerender);
            this.resizeTimeoutForColorPickerRerender = null;
          }
          this.resizeTimeoutForColorPickerRerender = setTimeout(() => {
            this.renderColorPickerView = true;
            this.resizeTimeoutForColorPickerRerender = null;
          }, 300);
        }

        this.updateSizeOfCanvas();
      };
      this.updateSizeOfCanvas();
    }
  }

  updateSizeOfCanvas = () => {
    const outerCanvasContainer = document.getElementById(
      "annotationCanvasContainer"
    );
    const content = document.getElementById("content");

    const ratio = this.canvasRef.getWidth() / this.canvasRef.getHeight();
    const containerWidth = outerCanvasContainer.clientWidth;

    let width = containerWidth;
    let height = containerWidth / ratio;

    const setHeightByWidth = () => {
      width = content.offsetWidth;
      height = width / ratio;
    };

    const setWidthByHeight = () => {
      height = content.offsetHeight;
      width = height * ratio;
    };

    const maintainHeightWidth = () => {
      if (width > content.offsetWidth) {
        setHeightByWidth();
      }
      if (height > content.offsetHeight) {
        setWidthByHeight();
      }
    };

    maintainHeightWidth();

    if (height != content.offsetHeight && width !== content.offsetWidth) {
      if (width > height) {
        setHeightByWidth();
      } else {
        setWidthByHeight();
      }
    }

    maintainHeightWidth();

    const scale = width / this.canvasRef.getWidth();

    const devicePixelRatio =
      window.devicePixelRatio > 1 ? 1 : window.devicePixelRatio;
    const zoom = this.canvasRef.getZoom() * scale * devicePixelRatio;

    this.canvasRef.setDimensions({
      width: width * devicePixelRatio,
      height: height * devicePixelRatio,
    });
    this.canvasRef.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);
  };

  private customiseControl() {
    fabric.Object.prototype.cornerStyle = "circle";
    fabric.Object.prototype.cornerColor = "#2A6FDB";
    fabric.Object.prototype.cornerSize = 16;
    fabric.Object.prototype.strokeWidth = 2;
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.hasBorders = false;
    fabric.Object.prototype.cornerStrokeColor = "#fff";
    fabric.Object.prototype.setControlsVisibility({
      ml: false,
      mr: false,
      mb: false,
      mt: false,
    });

    fabric.Object.prototype.controls.deleteControl = this.trashControl();

    const rotateIcon = (ctx, left, top, styleOverride, fabricObject) => {
      const img = document.createElement("img");
      img.src = "./assets/icon/rotate.svg";
      img.onload = function () {
        const size = 24;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    };

    // Setting position of rotate corner
    fabric.Object.prototype.controls.mtr.y = 0.5;
    fabric.Object.prototype.controls.mtr.offsetY = 40;
    fabric.Object.prototype.controls.mtr.render = rotateIcon;
  }

  private commonSetting = () => {
    return {
      top: 150,
      left: 150,
      fill: "transparent",
      stroke: this.defaultColor,
      strokeWidth: this.defaultThickness,
    };
  };

  private addObjectAndActiveIt = (object) => {
    object.on("selected", () => {
      this.isColorThicknessViewOpen = true;
    });

    object.on("deselected", () => {
      this.isColorThicknessViewOpen = false;
    });

    this.canvasRef.add(object);
    this.canvasRef.setActiveObject(object);
    setTimeout(() => {
      this.canvasRef.requestRenderAll();
    }, 200);
  };

  private trashControl = () => {
    const deleteObject = (eventData, target) => {
      const canvas = target.canvas || this.canvasRef;
      const targetObj = target.canvas ? target : target.target;
      if (targetObj.getObjects) {
        targetObj.getObjects().map((item) => {
          canvas.remove(item);
        });
      }
      canvas.remove(targetObj);
      canvas.requestRenderAll();
      this.isColorThicknessViewOpen = false;
    };

    const renderIcon = (ctx, left, top, styleOverride, fabricObject) => {
      const img = document.createElement("img");
      img.src = "./assets/icon/trash.svg";
      img.onload = function () {
        const size = 24;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      };
    };

    return new fabric.Control({
      x: 0.75,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderIcon,
    });
  };

  /**
   * UI actions methods
   */

  onColorChanged(color) {
    const activeObject = this.canvasRef.getActiveObject();
    if (activeObject) {
      console.log("activeObject.type" + activeObject.type);

      if (
        activeObject.type === "rect" ||
        activeObject.type === "circle" ||
        activeObject.type === "path"
      ) {
        activeObject.set("stroke", color);
      } else if (activeObject.type === "textbox") {
        activeObject.set("fill", color);
      } else if (activeObject.type === "ArrowLine") {
        activeObject.set("stroke", color);
        activeObject.set("fill", color);
      }
    } else if (this.canvasRef.isDrawingMode) {
      this.canvasRef.freeDrawingBrush.color = color;
    }
    this.canvasRef.requestRenderAll();
    this.defaultColor = color;
    this.sharedDataService.annotationColor = color;
  }

  rangeChange(event) {
    const thickNess = event.target.value;
    console.log("Thickness " + this.defaultThickness);

    const activeObject = this.canvasRef.getActiveObject();
    if (activeObject) {
      if (
        activeObject.type === "rect" ||
        activeObject.type === "circle" ||
        activeObject.type === "path"
      ) {
        activeObject.set("strokeWidth", thickNess);
        this.defaultThickness = thickNess;
      } else if (activeObject.type === "ArrowLine") {
        this.addPolylinePoint(
          activeObject,
          100,
          150,
          150 + this.defaultThickness * 2,
          150,
          this.defaultThickness
        );
        this.defaultThickness = thickNess;
      } else if (activeObject.type === "textbox") {
        activeObject.set("fontSize", thickNess);
        this.defaultFontSize = thickNess;
      }
    } else if (this.canvasRef.isDrawingMode) {
      this.canvasRef.freeDrawingBrush.width = thickNess;
      this.defaultThickness = thickNess;
    }
    this.canvasRef.requestRenderAll();
  }

  addRectangle() {
    this.rangeValue = this.defaultThickness;
    this.isColorThicknessViewOpen = true;
    this.canvasRef.isDrawingMode = false;

    const rectangle = new fabric.Rect({
      ...this.commonSetting(),
      width: 160,
      height: 160,
    });
    this.addObjectAndActiveIt(rectangle);
  }

  addCircle() {
    this.rangeValue = this.defaultThickness;
    this.isColorThicknessViewOpen = true;
    this.canvasRef.isDrawingMode = false;

    const circle = new fabric.Circle({
      ...this.commonSetting(),
      radius: 80,
    });
    this.addObjectAndActiveIt(circle);
  }

  addPolyline(fromx, fromy, tox, toy, headlen) {
    const points = this.getArrowLinePoints(fromx, fromy, tox, toy, headlen);
    const pline = new fabric.ArrowLine(points, {
      fill: this.defaultColor,
      stroke: this.defaultColor,
      opacity: 1,
      strokeWidth: 1,
      selectable: true,
      strokeUniform: false,
      padding: 10,
    });

    this.addObjectAndActiveIt(pline);
  }

  getArrowLinePoints = (fromx, fromy, tox, toy, headlen) => {
    headlen = 10 + headlen + headlen / 4;
    const angle = Math.atan2(toy - fromy, tox - fromx);

    // bring the line end back some to account for arrow head.
    tox = tox - headlen * Math.cos(angle);
    toy = toy - headlen * Math.sin(angle);

    // calculate the points.
    const points = [
      {
        x: fromx, // start point
        y: fromy,
      },
      {
        x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox - headlen * Math.cos(angle - Math.PI / 2),
        y: toy - headlen * Math.sin(angle - Math.PI / 2),
      },
      {
        x: tox + headlen * Math.cos(angle), // tip
        y: toy + headlen * Math.sin(angle),
      },
      {
        x: tox - headlen * Math.cos(angle + Math.PI / 2),
        y: toy - headlen * Math.sin(angle + Math.PI / 2),
      },
      {
        x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2),
      },
      {
        x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
        y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2),
      },
      {
        x: fromx,
        y: fromy,
      },
    ];

    return points;
  };

  addPolylinePoint(shape, fromx, fromy, tox, toy, headlen) {
    shape.points = this.getArrowLinePoints(fromx, fromy, tox, toy, headlen);
    this.canvasRef.remove(shape);
    const obj = shape.toObject();
    shape = new fabric.ArrowLine(shape.points, obj);
    this.addObjectAndActiveIt(shape);
  }

  addLine() {
    this.rangeValue = this.defaultThickness;
    this.isColorThicknessViewOpen = true;
    this.canvasRef.isDrawingMode = false;

    const strokeWidth = this.defaultThickness;
    this.addPolyline(100, 150, 150 + strokeWidth * 2, 150, strokeWidth);
  }

  addFreeLine() {
    this.canvasRef.discardActiveObject();
    this.rangeValue = this.defaultThickness;
    this.isColorThicknessViewOpen = true;
    const canvas = this.canvasRef;
    canvas.isDrawingMode = true;
    this.canvasRef.freeDrawingBrush.color = this.defaultColor;
    this.canvasRef.freeDrawingBrush.width = this.defaultThickness;
  }

  addText() {
    this.rangeValue = this.defaultFontSize;
    this.isColorThicknessViewOpen = true;
    this.canvasRef.isDrawingMode = false;

    const defaultWidth = 200;
    const topY = this.canvasRef.height / 2 - this.defaultFontSize / 2;
    const xPost = this.canvasRef.width / 2 - defaultWidth / 2;
    const text = new fabric.Textbox("", {
      top: topY,
      left: xPost,
      width: defaultWidth,
      fill: this.defaultColor,
      fontSize: this.defaultFontSize,
      textAlign: "center",
    });
    this.canvasRef.on("text:changed", (opt) => {
      // const t1 = opt.target;
      // if (t1.width > t1.fixedWidth) {
      //     t1.fontSize *= t1.fixedWidth / (t1.width + 1);
      //     t1.width = t1.fixedWidth;
      // }
    });

    text.controls.deleteControl = this.trashControl();
    this.addObjectAndActiveIt(text);
    text.enterEditing();
    text.hiddenTextarea.focus();
  }

  async onClose() {
    this.translateService
      .get([
        "PAGESPECIFIC_TEXT.IMAGE_ANNOTATION.YOU_ARE_LEAVING",
        "PAGESPECIFIC_TEXT.IMAGE_ANNOTATION.YOU_ARE_LEAVING_MESSAGE",
        "SHARED_TEXT.YES",
        "SHARED_TEXT.NO",
      ])
      .subscribe(async (res) => {
        const alert = await this.alertController.create({
          cssClass: "my-custom-class",
          header: res["PAGESPECIFIC_TEXT.IMAGE_ANNOTATION.YOU_ARE_LEAVING"],
          message:
            "<strong>" +
            res["PAGESPECIFIC_TEXT.IMAGE_ANNOTATION.YOU_ARE_LEAVING_MESSAGE"] +
            "</strong>",
          buttons: [
            {
              text: res["SHARED_TEXT.NO"],
              role: "cancel",
              cssClass: "secondary",
              handler: (blah) => {
                console.log("Confirm Cancel: blah");
              },
            },
            {
              text: res["SHARED_TEXT.YES"],
              handler: () => {
                this.navCtrl.back();
              },
            },
          ],
        });

        await alert.present();
      });
  }

  onContinue() {
    this.canvasRef.discardActiveObject();
    this.canvasRef.isDrawingMode = false;
    const imageMultiplier = this.imageMultiplier;
    const qualityVal = StaticDataService.photoQuality / 100;

    const downlaodImg = this.canvasRef.toDataURL({
      format: "jpeg",
      quality: qualityVal,
      multiplier: imageMultiplier,
    });

    if (this.sharedDataService.onAnnotationImageDone) {
      this.sharedDataService.onAnnotationImageDone(downlaodImg);
    }
    this.navCtrl.back();
  }
}
