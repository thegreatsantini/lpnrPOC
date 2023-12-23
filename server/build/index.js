"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var ring_client_api_1 = require("ring-client-api");
var path = __importStar(require("path"));
var fs_1 = __importDefault(require("fs"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var axios_1 = __importDefault(require("axios"));
var tesseract_js_1 = require("tesseract.js");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
var port = 8000; //process.env.PORT;
app.get("/plateNumber", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var worker, ret;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log("Reading Text");
                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                return [4 /*yield*/, (0, tesseract_js_1.createWorker)("eng")];
            case 1:
                worker = _a.sent();
                return [4 /*yield*/, worker.recognize(path.resolve("./", "output", "test2.png")
                    // { rectangle: { left: 266, top: 162, width: 82, height: 42 } }
                    )];
            case 2:
                ret = _a.sent();
                console.log(ret.data.text);
                return [4 /*yield*/, worker.terminate()];
            case 3:
                _a.sent();
                res.json(ret.data);
                return [2 /*return*/];
        }
    });
}); });
app.get("/checkQueue", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ringApi, locations, snapshot;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("HHHELLLLLLL");
                ringApi = new ring_client_api_1.RingApi({
                    refreshToken: "eyJydCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW1wcmRTSTZJaTl2WVhWMGFDOXBiblJsY201aGJDOXFkMnR6SWl3aWEybGtJam9pTkdSak9EUXlaR0lpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBZWFFpT2pFM01EQTVOekUwTURBc0ltbHpjeUk2SWxKcGJtZFBZWFYwYUZObGNuWnBZMlV0Y0hKdlpEcDFjeTFsWVhOMExURTZZVGc1T0daa1pEa2lMQ0p5WldaeVpYTm9YMk5wWkNJNkluSnBibWRmYjJabWFXTnBZV3hmWVc1a2NtOXBaQ0lzSW5KbFpuSmxjMmhmYzJOdmNHVnpJanBiSW1Oc2FXVnVkQ0pkTENKeVpXWnlaWE5vWDNWelpYSmZhV1FpT2pFeE5EVTRNVEV5T1N3aWNtNWtJam9pYlU5VGVISm5RVmxaVXlJc0luTmxjM05wYjI1ZmFXUWlPaUpoWlRZeFpHUTJOeTB4TldObExUUm1PRGt0T1RaaE1pMDVNVEEzWWpOaU9XRm1ZemNpTENKMGVYQmxJam9pY21WbWNtVnphQzEwYjJ0bGJpSjkuQ3M3WmNOSlNkUk1UXzJoWUx4YXFGQnlsbGpwdXZZNVVvMzVJZjMtVVJaaUlJZXhNaUt1UkY2LUtpRkJOdXNMRXBHNmhjakZoNWJLTXJKcXBraHlLSUs0S1pPV1B2ZC1CaW1aNjNsal9Wc1NqNXoxdWhwVkdTSUs4NV9sSzBIXy01aVc0SlA5Q3YxMS1vUENMMEpCNzhhN1RVWHZ6a2RDVWU2S2U5U2xYZndIMlY1eWxUbVdBRmFFS1hEUmdoQk9fUkh0eXdGbHJsTmlld0lGbURibjd5YkZTN09DTTVGYllHTlRfNlA1RGVteHdpWWtpZ0NKRXhjTUdkS1VkSzdaeGpjZE8yaDVMSUZkUUdIM0JxeEhnVU1DeF9zQ0I2UkJUMjNCVkJoWlhQM1B2ekFVNlVWU3VKWlA2SjBCR1BpOEY0N1BJYXdkcm9WaGhYdEpfM2pvRFlRIiwiaGlkIjoiNWJiMjMxYmEtNWExYi01YzgwLTg5YjUtZjIzMGUwNGE5ZmYzIn0=",
                    debug: true,
                });
                return [4 /*yield*/, ringApi.getLocations()];
            case 1:
                locations = (_a.sent())[0];
                snapshot = locations.cameras[0].getSnapshot();
                snapshot
                    .then(function (imgBuff) {
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                    console.log("Taking snapshot");
                    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                    fs_1.default.writeFile(path.join("./", "output", "snapshot.png"), imgBuff, function () {
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                        console.log("checking for plate");
                        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                        try {
                            var image_1 = fs_1.default.readFileSync(path.join("./", "output", "snapshot.png"), {
                                encoding: "base64",
                            });
                            (0, axios_1.default)({
                                method: "POST",
                                url: "https://detect.roboflow.com/license-plate-recognition-rxg4e/4",
                                params: {
                                    api_key: "q23lBqTMbzJ0z8hRpE7m",
                                },
                                data: image_1,
                                headers: {
                                    cache: "no-cache",
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },
                            })
                                .then(function (response) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var predictions, _a, x, y, width, height, worker, ret;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                predictions = response.data.predictions;
                                                _a = predictions[0], x = _a.x, y = _a.y, width = _a.width, height = _a.height;
                                                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                                                console.log("Reading Text");
                                                console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                                                return [4 /*yield*/, (0, tesseract_js_1.createWorker)("eng")];
                                            case 1:
                                                worker = _b.sent();
                                                return [4 /*yield*/, worker.recognize(path.resolve("./", "output", "snapshot.jpg")
                                                    // { rectangle: { left: x, top: y, width, height } }
                                                    )];
                                            case 2:
                                                ret = _b.sent();
                                                console.log(ret.data.text);
                                                return [4 /*yield*/, worker.terminate()];
                                            case 3:
                                                _b.sent();
                                                res.json(__assign(__assign({}, response.data), { image: image_1, text: ret.data.text }));
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            })
                                .catch(function (error) {
                                console.log(error.message);
                                res.json(error.message);
                            });
                        }
                        catch (err) {
                            console.log("error with roboflow", err);
                        }
                    });
                })
                    .catch(function (err) {
                    console.log(err);
                    res.status(500).json("Error when writing snapshot");
                })
                    .finally(function () { });
                return [2 /*return*/];
        }
    });
}); });
/**
 * This example streams to files, each with 10 seconds of video.
 * The output will be in output/part${part #}.mp4
 **/
// async function example() {
//   const ringApi = new RingApi({
//       // Replace with your refresh token
//       refreshToken:
//         "eyJydCI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW1wcmRTSTZJaTl2WVhWMGFDOXBiblJsY201aGJDOXFkMnR6SWl3aWEybGtJam9pTkdSak9EUXlaR0lpTENKMGVYQWlPaUpLVjFRaWZRLmV5SnBZWFFpT2pFM01EQTVOakEzTnpBc0ltbHpjeUk2SWxKcGJtZFBZWFYwYUZObGNuWnBZMlV0Y0hKdlpEcDFjeTFsWVhOMExURTZZVGc1T0daa1pEa2lMQ0p5WldaeVpYTm9YMk5wWkNJNkluSnBibWRmYjJabWFXTnBZV3hmWVc1a2NtOXBaQ0lzSW5KbFpuSmxjMmhmYzJOdmNHVnpJanBiSW1Oc2FXVnVkQ0pkTENKeVpXWnlaWE5vWDNWelpYSmZhV1FpT2pFeE5EVTRNVEV5T1N3aWNtNWtJam9pUjFaRVpIUktSRU5NVWlJc0luTmxjM05wYjI1ZmFXUWlPaUl6TW1ZeFpqYzVZeTA1TVRsaExUUXpZV1V0WVRsaU1pMWpabVJrTjJGak5EUmpORElpTENKMGVYQmxJam9pY21WbWNtVnphQzEwYjJ0bGJpSjkuU09uakhIVTZXd1B5ZDc2WEZIUDdqd3o4Smx0QW9TWllJT25XRFAxa1JRNm9ZQlJYcVA3dGc0VkhjQTE3YWdSNjZfdG5HT01RczUta3M1RzJEZGJGQVo1MW9GR2V4NEhxNnNZUXJxbWV0ZUdmRm4xNzJjLUpwX0pwSFd2Z2t0N1RsZ1dGWlliSWhlMzBReEdSdXVaZGNkbzNzOWtEVzJrUEJqVmN1aEc5YWlLelFvM003aS1XLUxxYmRpZ2pkSkpzYlRDX2xpV2RIM3p5eXVBeWFCdm9hVjJsMnI1YzlUOWdyc3B3RF9HUGZIUUlDSFlQOEs1S3lUNFZTY2xJekdZenA5Z1NYdG1VdmhUeHlWdHdkQnVGempSMm44WDF0NHN4WEEzREhYUDF5M3pGWmdvdGJrMU9iOFFZdVZTNGExamNiYy12cUViOUtQS09VdGhSbVplaGhnIiwiaGlkIjoiMGZhNGY4YmYtMTRmYS01M2U2LWIwNDUtMzNkZmZiZmY5YTQyIn0=",
//       debug: true,
//     }),
//     [camera] = await ringApi.getCameras();
//   const [locations] = await ringApi.getLocations();
//   const test = locations.cameras[0].streamVideo({
//     output: [path.join("./", "output", "part_2.mp4")],
//   });
//   const snapshot = locations.cameras[0].getSnapshot();
//   snapshot.then((imgBuff) => {
//     console.log(imgBuff);
//     fs.writeFile(path.join("./", "output", "snapshot.jpeg"), imgBuff, () => {
//       console.log(
//         "image added to:",
//         path.join("./", "output", "snapshot.jpeg")
//       );
//     });
//   });
//   test.then((val) => {
//     val.activateCameraSpeaker();
//     return val;
//   });
//   if (!camera) {
//     console.log("No cameras found");
//     return;
//   }
//   console.log("Starting Video...");
//   console.log(path.join("./", "output", "part.mp4"));
//   const call = await camera.streamVideo({
//     // save video 10 second parts so the mp4s are playable and not corrupted:
//     // https://superuser.com/questions/999400/how-to-use-ffmpeg-to-extract-live-stream-into-a-sequence-of-mp4
//     output: [
//       "-flags",
//       "+global_header",
//       "-f",
//       "segment",
//       "-segment_time",
//       "10", // 10 seconds
//       "-segment_format_options",
//       "movflags=+faststart",
//       "-reset_timestamps",
//       "1",
//       path.join("./", "output", "part.mp4"),
//     ],
//   });
//   //   sudo curl -Lf# https://github.com/homebridge/ffmpeg-for-homebridge/releases/latest/download/ffmpeg-alpine-arm32v7.tar.gz | sudo tar xzf - -C / --no-same-owner
//   console.log("Video started, streaming to part files...");
//   call.onCallEnded.subscribe(() => {
//     console.log("Call has ended");
//     process.exit();
//   });
//   setTimeout(function () {
//     console.log("Stopping call...");
//     call.stop();
//   }, 60 * 1000); // Stop after 1 minute
// }
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
