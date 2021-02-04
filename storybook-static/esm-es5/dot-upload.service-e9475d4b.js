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
        while (_) try {
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
var fallbackErrorMessages = {
    500: '500 Internal Server Error',
    400: '400 Bad Request',
    401: '401 Unauthorized Error'
};
var TEMP_API_URL = '/api/v1/temp';
var DotUploadService = /** @class */ (function () {
    function DotUploadService() {
    }
    /**
     * Will call the corresponding endpoint to upload a temporary file.
     * Return the information of tha file in the server
     * @param file
     * @param maxSize
     *
     * @memberof DotUploadService
     */
    DotUploadService.prototype.uploadFile = function (file, maxSize) {
        if (typeof file === 'string') {
            return this.uploadFileByURL(file);
        }
        else {
            return this.uploadBinaryFile(file, maxSize);
        }
    };
    DotUploadService.prototype.uploadFileByURL = function (url) {
        var _this = this;
        var UPLOAD_FILE_FROM_URL = TEMP_API_URL + "/byUrl";
        return fetch(UPLOAD_FILE_FROM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Origin: window.location.hostname
            },
            body: JSON.stringify({
                remoteUrl: url
            })
        }).then(function (response) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(response.status === 200)) return [3 /*break*/, 2];
                        return [4 /*yield*/, response.json()];
                    case 1: return [2 /*return*/, (_b.sent()).tempFiles[0]];
                    case 2:
                        _a = this.errorHandler;
                        return [4 /*yield*/, response.json()];
                    case 3: throw _a.apply(this, [_b.sent(), response.status]);
                }
            });
        }); });
    };
    /**
     * Will call the temp resource endpoint to upload a temporary file.
     * With a callback to track the progress of the upload
     * Return the information of tha file(s) in the server
     * @param data
     * @param progressCallBack
     * @param maxSize
     *
     * @memberof DotUploadService
     */
    DotUploadService.prototype.uploadBinaryFile = function (data, progressCallBack, maxSize) {
        var _this = this;
        var path = TEMP_API_URL;
        path += maxSize ? "?maxFileLength=" + maxSize : '';
        var formData = new FormData();
        var files = Array.isArray(data) ? data : [data];
        files.forEach(function (file) {
            formData.append('files', file);
        });
        return this.dotRequest(path, {
            method: 'POST',
            headers: {},
            body: formData
        }, progressCallBack)
            .then(function (request) { return __awaiter(_this, void 0, void 0, function () {
            var data_1;
            return __generator(this, function (_a) {
                if (request.status === 200) {
                    data_1 = JSON.parse(request.response).tempFiles;
                    return [2 /*return*/, data_1.length > 1 ? data_1 : data_1[0]];
                }
                else {
                    throw request;
                }
                return [2 /*return*/];
            });
        }); })
            .catch(function (request) {
            throw _this.errorHandler(JSON.parse(request.response), request.status);
        });
    };
    DotUploadService.prototype.dotRequest = function (url, opts, progressCallBack) {
        return new Promise(function (res, rej) {
            var xhr = new XMLHttpRequest();
            xhr.open(opts.method || 'get', url);
            for (var name in opts.headers || {}) {
                xhr.setRequestHeader(name, opts.headers[name]);
            }
            xhr.onload = function () { return res(xhr); };
            xhr.onerror = rej;
            if (xhr.upload && progressCallBack) {
                xhr.upload.onprogress = function (e) {
                    var percentComplete = (e.loaded / e.total) * 100;
                    progressCallBack(percentComplete);
                };
            }
            xhr.send(opts.body);
        });
    };
    DotUploadService.prototype.errorHandler = function (response, status) {
        var message = '';
        try {
            message = response.message || fallbackErrorMessages[status];
        }
        catch (e) {
            message = fallbackErrorMessages[status | 500];
        }
        return {
            message: message,
            status: status | 500
        };
    };
    return DotUploadService;
}());
export { DotUploadService as D, fallbackErrorMessages as f };
