webpackHotUpdate("main",{

/***/ "./src/services/art/art.service.js":
/*!*****************************************!*\
  !*** ./src/services/art/art.service.js ***!
  \*****************************************/
/*! exports provided: artService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "artService", function() { return artService; });
/* harmony import */ var _http_service_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../http.service.js */ "./src/services/http.service.js");
/* harmony import */ var _art_storage_service_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./art-storage.service.js */ "./src/services/art/art-storage.service.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);



const STORAGE_KEY = 'arts';
const artService = {
  // query,
  getById,
  save,
  remove,
  loadArts
};

async function loadArts(filterBy) {
  //  const arts = await httpService.get('art', filterBy);
  console.log('service ');
  const arts = await _art_storage_service_js__WEBPACK_IMPORTED_MODULE_1__["storageService"].query(STORAGE_KEY, filterBy); // instead of this line
  // return await storageService.loadArtsWithArtists(arts);

  return arts;
}

async function getById(artId) {
  return await _art_storage_service_js__WEBPACK_IMPORTED_MODULE_1__["storageService"].get('arts', artId); // const art = await httpService.get(`art/${artId}`);
  // console.log('art', art);
  // return art;
}

async function remove(artId) {
  return await _art_storage_service_js__WEBPACK_IMPORTED_MODULE_1__["storageService"].remove('arts', artId); // return httpService.delete(`art/${artId}`)
}

async function save(art) {
  if (art._id) {
    return await _art_storage_service_js__WEBPACK_IMPORTED_MODULE_1__["storageService"].put('arts', art); //  return await httpService.put('art/',`${art_id}`, art)
  } else {
    return await _art_storage_service_js__WEBPACK_IMPORTED_MODULE_1__["storageService"].post('arts', art); // return httpService.post('art/', art)
  }
} // export function filter(filterBy){
//     if (filterBy !== 'all'){
//         console.log('service',filterBy);
//             //  return axios.get(BASE_URL).then(toys=>
//             // toys.data.filter(toy => toy.inStock === filterBy || toy.type === filterBy || toy.name.includes(filterBy)))
//         return httpService.get('toy/', filterBy)    
//     }else{
//        return query()
//         }
//     }

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.7b8154769a5e46f12936.hot-update.js.map