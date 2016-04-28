angular.module("schemaForm").run(["$templateCache", function($templateCache) {$templateCache.put("directives/decorators/bootstrap/uiselect/multi.html","<div\n    ng-init=\"form.select_models=(form.schema.items| whereMulti : \'value\' : ($$value$$||[]))\"\n    ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false}\"\n    class=\"form-group\" >\n\n  <label ng-show=\"showTitle()\" class=\"control-label\" >{{form.title}}</label>\n\n  <div\n    ng-controller=\"UiSelectController\"\n    class=\"form-group\" >\n\n    <!-- Not tagging -->\n    <ui-select\n      ng-if=\"!(form.options.tagging||false)\"\n      ng-model=\"form.select_models\"\n      multiple\n      theme=\"bootstrap\"\n      on-select=\"$$value$$.push($item.value)\"\n      on-remove=\"$$value$$.splice($$value$$.indexOf($item.value), 1)\"\n      sortable-options=\"{{form.sortableOptions}}\"\n      class=\"{{form.options.uiClass}}\">\n\n      <ui-select-match\n        placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\"\n        class=\"ui-select-match\" >\n        {{$item.label}}\n      </ui-select-match>\n\n      <ui-select-choices\n        class=\"ui-select-choices\"\n        refresh=\"fetchResult(form.schema, form.options, $select.search)\"\n        refresh-delay=\"form.options.refreshDelay\"\n        group-by=\"form.options.groupBy\"\n        repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\">\n\n        <div ng-bind-html=\"item.label | highlight: $select.search\"></div>\n        <div ng-if=\"item.description\">\n          <span ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\'))+ \'</small>\'\"></span>\n        </div>\n      </ui-select-choices>\n\n    </ui-select>\n\n\n    <!-- tagging & !groupBy -->\n    <ui-select\n      ng-if=\"(form.options.tagging||false) && !(form.options.groupBy||false)\"\n      ng-model=\"form.select_models\"\n      multiple\n      tagging=\"form.options.tagging||false\"\n      tagging-label=\"form.options.taggingLabel\"\n      tagging-tokens=\"form.options.taggingTokens\"\n      sortable-options=\"{{form.sortableOptions}}\"\n      theme=\"bootstrap\"\n      on-select=\"$$value$$.push($item.value)\"\n      on-remove=\"$$value$$.splice($$value$$.indexOf($item.value), 1)\"\n      class=\"{{form.options.uiClass}}\" >\n\n      <ui-select-match\n        placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\"\n        class=\"ui-select-match\">\n        {{$item.label}}&nbsp;<small>{{($item.isTag===true ?  form.options.taggingLabel : \'\')}}</small>\n      </ui-select-match>\n\n      <ui-select-choices\n        class=\"ui-select-choices\"\n        refresh-delay=\"form.options.refreshDelay\"\n        refresh=\"fetchResult(form.schema, form.options, $select.search)\"\n        repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\">\n\n        <div\n          ng-if=\"item.isTag\"\n          ng-bind-html=\"\'<div>\' + (item.label   | highlight: $select.search) + \' \' + form.options.taggingLabel + \'</div><div class=&quot;divider&quot;></div>\'\">\n        </div>\n\n        <div ng-if=\"!item.isTag\"\n          ng-bind-html=\"item.label + item.isTag | highlight: $select.search\">\n        </div>\n\n        <div ng-if=\"item.description\">\n          <span ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) + \'</small>\'\"></span>\n        </div>\n      </ui-select-choices>\n\n    </ui-select>\n\n\n    <!-- tagging & groupBy -->\n    <!--repeat code because tagging does not display properly under group by but is still useful -->\n    <ui-select\n      ng-if=\"(form.options.tagging||false) && (form.options.groupBy || false)\"\n      multiple\n      tagging=\"form.options.tagging||false\"\n      tagging-label=\"form.options.taggingLabel\"\n      tagging-tokens=\"form.options.taggingTokens\"\n      sortable-options=\"{{form.sortableOptions}}\"\n      ng-model=\"form.select_models\"\n      theme=\"bootstrap\"\n      on-select=\"$$value$$.push($item.value)\"\n      on-remove=\"$$value$$.splice($$value$$.indexOf($item.value), 1)\"\n      class=\"{{form.options.uiClass}}\">\n\n      <ui-select-match\n        class=\"ui-select-match\"\n        placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\">\n          {{$item.label}}&nbsp;<small>{{($item.isTag===true ?  form.options.taggingLabel : \'\')}}</small>\n      </ui-select-match>\n\n      <ui-select-choices\n        class=\"ui-select-choices\"\n        group-by=\"form.options.groupBy\"\n        refresh-delay=\"form.options.refreshDelay\"\n        refresh=\"fetchResult(form.schema, form.options, $select.search)\"\n        refresh-delay=\"form.options.refreshDelay\"\n        repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\">\n\n        <div ng-if=\"item.isTag\"\n          ng-bind-html=\"\'<div>\' + (item.label   | highlight: $select.search) + \' \' + form.options.taggingLabel + \'</div><div class=&quot;divider&quot;></div>\'\">\n        </div>\n\n        <div ng-if=\"!item.isTag\"\n          ng-bind-html=\"item.label + item.isTag | highlight: $select.search\">\n        </div>\n\n        <div ng-if=\"item.description\">\n          <span ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) + \'</small>\'\"></span>\n        </div>\n      </ui-select-choices>\n\n    </ui-select>\n\n    <input\n      type=\"hidden\"\n      toggle-model\n      ng-model=\"insideModel\"\n      sf-changed=\"form\"\n      schema-validate=\"form\" />\n\n    <span\n      ng-if=\"form.feedback !== false\"\n      ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n      class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\"\n      ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\"\n      ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\">\n    </div>\n\n  </div>\n</div>\n");
$templateCache.put("directives/decorators/bootstrap/uiselect/single.html","<div\n  ng-init=\"select_models=(form.schema.items | where : {value: $$value$$})\"\n  ng-class=\"{\'has-error\': hasError(), \'has-success\': hasSuccess(), \'has-feedback\': form.feedback !== false}\"\n  class=\"form-group\" >\n\n  <label ng-show=\"showTitle()\" class=\"control-label\">{{form.title}}</label>\n\n  <div\n    ng-controller=\"UiSelectController\"\n    ng-init=\"select_model.selected=select_models[0]\"\n    class=\"form-group\" >\n\n    <!-- Not tagging -->\n    <ui-select\n      ng-if=\"!(form.options.tagging||false)\"\n      ng-model=\"select_model.selected\"\n      ng-disabled=\"form.disabled\"\n      theme=\"bootstrap\"\n      on-select=\"$$value$$=$item.value\"\n      class=\"{{form.options.uiClass}}\">\n\n      <ui-select-match\n        placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\"\n        class=\"ui-select-match\" >\n        {{select_model.selected.label}}\n      </ui-select-match>\n\n      <ui-select-choices\n        refresh=\"fetchResult(form.schema, form.options, $select.search)\"\n        refresh-delay=\"form.options.refreshDelay\"\n        group-by=\"form.options.groupBy\"\n        repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\"\n        class=\"ui-select-choices\" >\n        <div ng-bind-html=\"item.label | highlight: $select.search\"></div>\n        <div ng-if=\"item.description\">\n          <span\n            ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\'))+ \'</small>\'\">\n          </span>\n        </div>\n      </ui-select-choices>\n\n    </ui-select>\n\n    <!-- tagging & !groupBy -->\n    <ui-select\n      ng-if=\"(form.options.tagging||false) && !(form.options.groupBy||false)\"\n      ng-model=\"select_model.selected\"\n      ng-disabled=\"form.disabled\"\n      tagging=\"form.options.tagging||false\"\n      tagging-label=\"form.options.taggingLabel\"\n      tagging-tokens=\"form.options.taggingTokens\"\n      theme=\"bootstrap\"\n      on-select=\"$$value$$=$item.value\"\n      class=\"{{form.options.uiClass}}\">\n\n      <ui-select-match\n        placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\"\n        class=\"ui-select-match\">\n        {{select_model.selected.label}}&nbsp;<small>{{(select_model.selected.isTag===true ? form.options.taggingLabel : \'\')}}</small>\n      </ui-select-match>\n\n      <ui-select-choices\n        refresh=\"form.options.refreshMethod(form.schema, $select.search)\"\n        refresh-delay=\"form.options.refreshDelay\"\n        repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescription===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\"\n        class=\"ui-select-choices\" >\n        <div\n          ng-if=\"item.isTag\"\n          ng-bind-html=\"\'<div>\' + (item.label   | highlight: $select.search) + \' \' + form.options.taggingLabel + \'</div><div class=&quot;divider&quot;></div>\'\">\n        </div>\n        <div\n          ng-if=\"!item.isTag\"\n          ng-bind-html=\"item.label + item.isTag| highlight: $select.search\">\n        </div>\n        <div ng-if=\"item.description\">\n          <span\n            ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) + \'</small>\'\">\n          </span>\n        </div>\n      </ui-select-choices>\n    </ui-select>\n\n\n    <!-- tagging & groupBy -->\n    <!--repeat code because tagging does not display properly under group by but is still useful -->\n    <ui-select\n      ng-if=\"(form.options.tagging||false) && (form.options.groupBy||false)\"\n      ng-model=\"select_model.selected\"\n      ng-disabled=\"form.disabled\"\n      tagging=\"form.options.tagging||false\"\n      tagging-label=\"form.options.taggingLabel\"\n      tagging-tokens=\"form.options.taggingTokens\"\n      theme=\"bootstrap\"\n      on-select=\"$$value$$=$item.value\"\n      class=\"{{form.options.uiClass}}\">\n\n      <ui-select-match\n        class=\"ui-select-match\"\n        placeholder=\"{{form.placeholder || form.schema.placeholder || (\'placeholders.select\' | translate)}}\">\n        {{select_model.selected.label}}&nbsp;<small>{{(select_model.selected.isTag===true ? form.options.taggingLabel : \'\')}}</small>\n      </ui-select-match>\n\n      <ui-select-choices\n        group-by=\"form.options.groupBy\"\n        refresh=\"form.options.refreshMethod(form.schema, $select.search)\"\n        refresh-delay=\"form.options.refreshDelay\"\n        repeat=\"item in form.schema.items | propsFilter: {label: $select.search, description: (form.options.searchDescription===true ? $select.search : \'NOTSEARCHINGFORTHIS\') }\"\n        class=\"ui-select-choices\" >\n        <div\n          ng-if=\"item.isTag\"\n          ng-bind-html=\"\'<div>\' + (item.label   | highlight: $select.search) + \' \' + form.options.taggingLabel + \'</div><div class=&quot;divider&quot;></div>\'\">\n        </div>\n        <div\n          ng-if=\"!item.isTag\"\n          ng-bind-html=\"item.label + item.isTag| highlight: $select.search\">\n        </div>\n        <div ng-if=\"item.description\">\n          <span ng-bind-html=\"\'<small>\' + (\'\'+item.description | highlight: (form.options.searchDescriptions===true ? $select.search : \'NOTSEARCHINGFORTHIS\')) + \'</small>\'\"></span>\n        </div>\n      </ui-select-choices>\n    </ui-select>\n\n    <input\n      type=\"hidden\"\n      toggle-single-model\n      ng-model=\"insideModel\"\n      sf-changed=\"form\"\n      schema-validate=\"form\" />\n\n    <span\n      ng-if=\"form.feedback !== false\"\n      ng-class=\"evalInScope(form.feedback) || {\'glyphicon\': true, \'glyphicon-ok\': hasSuccess(), \'glyphicon-remove\': hasError() }\"\n      class=\"form-control-feedback\">\n    </span>\n\n    <div class=\"help-block\"\n      ng-show=\"(hasError() && errorMessage(schemaError())) || form.description\"\n      ng-bind-html=\"(hasError() && errorMessage(schemaError())) || form.description\">\n    </div>\n\n  </div>\n</div>\n");}]);
angular.module('schemaForm').config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', 'sfBuilderProvider',
  function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {

    var uiselectString = function(name, schema, options) {
      if (schema.type === 'string' && schema.format == 'uiselect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'uiselect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.string.unshift(uiselectString);

    var uiselectNumber = function(name, schema, options) {
      if (schema.type === 'number' && schema.format == 'uiselect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'uiselect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };

    schemaFormProvider.defaults.number.unshift(uiselectNumber);

    var uimultiselect = function(name, schema, options) {
      if (schema.type === 'array' && schema.format == 'uiselect') {
        var f = schemaFormProvider.stdFormObj(name, schema, options);
        f.key  = options.path;
        f.type = 'uimultiselect';
        options.lookup[sfPathProvider.stringify(options.path)] = f;
        return f;
      }
    };
    schemaFormProvider.defaults.array.unshift(uimultiselect);


    // TOFIX: change to the new way: https://github.com/json-schema-form/angular-schema-form/blob/development/docs/extending.md#creating-an-add-on
    //Add to the bootstrap directive
    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      'uiselect',
      'directives/decorators/bootstrap/uiselect/single.html',
      sfBuilderProvider.stdBuilders
    );

    schemaFormDecoratorsProvider.defineAddOn(
      'bootstrapDecorator',
      'uimultiselect',
      'directives/decorators/bootstrap/uiselect/multi.html',
      sfBuilderProvider.stdBuilders
    );
  }])
  .directive("toggleSingleModel", function() {
    // some how we get this to work ...
    return {
      require: 'ngModel',
      restrict: "A",
      scope: {},
      replace: true,
      controller: ['$scope', function($scope)  {
        $scope.$parent.$watch('select_model.selected',function(){
          if($scope.$parent.select_model.selected != undefined) {
            $scope.$parent.insideModel = $scope.$parent.select_model.selected.value;
            $scope.$parent.ngModel.$setViewValue($scope.$parent.select_model.selected.value);
          }
        });
      }],
    };
  })
  .directive("toggleModel", function() {
    // some how we get this to work ...
    return {
      require: 'ngModel',
      restrict: "A",
      scope: {},
      replace: true,
      controller: ['$scope','sfSelect', function($scope,  sfSelect)  {
        var list = sfSelect($scope.$parent.form.key, $scope.$parent.model);
        //as per base array implemenation if the array is undefined it must be set as empty for data binding to work
        if (angular.isUndefined(list)) {
            list = [];
            sfSelect($scope.$parent.form.key, $scope.$parent.model, list);
        }
        $scope.$parent.$watch('form.select_models',function(){
          if($scope.$parent.form.select_models.length == 0) {
            $scope.$parent.insideModel = $scope.$parent.$$value$$;
            if($scope.$parent.ngModel.$viewValue != undefined) {
              $scope.$parent.ngModel.$setViewValue($scope.$parent.form.select_models);
            }
          } else {
            $scope.$parent.insideModel = $scope.$parent.form.select_models;
            $scope.$parent.ngModel.$setViewValue($scope.$parent.form.select_models);
          }
        }, true);
      }],
    };
  })
  .filter('whereMulti', function() {
    return function(items, key, values) {
      var out = [];

      if (angular.isArray(values)) {
        values.forEach(function(value) {
          for (var i = 0; i < items.length; i++) {
            if (value == items[i][key]) {
              out.push(items[i]);
              break;
            }
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  })
  .filter('propsFilter', function() {
    return function(items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function(item) {
          var itemMatches = false;

          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            if (item.hasOwnProperty(prop)){
              //only match if this property is actually in the item to avoid
              var text = props[prop].toLowerCase();
              //search for either a space before the text or the textg at the start of the string so that the middle of words are not matched
              if (item[prop].toString().toLowerCase().indexOf(text) === 0 || ( item[prop].toString()).toLowerCase().indexOf(' ' + text) !== -1  ) {
                itemMatches = true;
                break;
              }
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        // Let the output be the input untouched
        out = items;
      }

      return out;
    };
  })
  .controller('UiSelectController', ['$scope', '$http', function($scope, $http) {

    $scope.fetchResult = function (schema, options, search) {
        if(options) {
          if (options.callback) {
              var cb_func = (typeof options.callback == 'function') ?
                  options.callback : new Function(options.callback);

              schema.items = cb_func(schema, options, search);
              console.log('items', schema.items);
          }
          else if (options.http_post) {
              return $http.post(options.http_post.url, options.http_post.parameter).then(
                  function (_data) {
                      schema.items = _data.data;
                      console.log('items', schema.items);
                  },
                  function (data, status) {
                      alert("Loading select items failed (URL: '" + String(options.http_post.url) +
                          "' Parameter: " + String(options.http_post.parameter) + "\nError: "  + status);
                  });
          }
          else if (options.http_get) {
              return $http.get(options.http_get.url, options.http_get.parameter).then(
                  function (_data) {
                      schema.items = _data.data;
                      console.log('items', schema.items);
                  },
                  function (data, status) {
                      alert("Loading select items failed (URL: '" + String(options.http_get.url) +
                          "\nError: "  + status);
                  });
          }
          else if (options.async) {
              var cb_func = (typeof options.async == 'function') ?
                  options.async : new Function(options.async);

              return cb_func(schema, options, search).then(
                  function (_data) {
                      schema.items = _data.data;
                      // ugly workaround to set the selected item coming from async calls
                      $scope.$select.selected = _.findWhere(schema.items, {'selected': true });
                      console.log('items', schema.items);
                  },
                  function (data, status) {
                      alert("Loading select items failed(Options: '" + String(options) +
                          "\nError: "  + status);
                  });
          }

        }
    };
  }])
