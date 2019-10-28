var myapp = angular.module("myModule", ["ngRoute",])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.caseInsensitiveMatch= true;
        $routeProvider
            .when("/home", {
                templateUrl: "home.html",
                controller: "homeController"
            })
            .when("/courses", {
                templateUrl: "courses.html",
                controller: "coursesController"
            })
            .when("/students", {
                templateUrl: "students.html",
                controller: "studentsController",
                controllerAs: "studentCtrl",
                resolve: {
                    studentList: function ($http) {
                        return $http.get("/api/students").then(function (response) {
                            if (response.data && response.data.data) {
                                return response.data.data;
                            }
                        });
                    }
                }

            })
            .when("/students/:id", {
                templateUrl: "studentDetails.html",
                controller: "studentDetailsController"
            })
            .otherwise({
                redirectTo: "/home"
            })
        $locationProvider.html5Mode({ enabled: true });
    }]);

myapp.controller("homeController", function ($scope) {
    $scope.message = "Home Page"
});

myapp.controller("coursesController", function ($scope) {
    $scope.courses = ["C++", "JAVA", "Angular", "Node"]
});

myapp.controller("studentsController", function (studentList, $http) {
    var stdCtrl = this;

    stdCtrl.nameToSearch = null;
    stdCtrl.students = studentList; // Page will get render when client willl get the data.

    stdCtrl.searchText = function (nameToSearch) {
        if (nameToSearch) {
            $http.get("/api/students/textsearch/" + stdCtrl.nameToSearch)
                .then(function (response) {
                    if (response.data && response.data.data) {
                        stdCtrl.students = response.data.data;
                    }
                })
        } else {
           stdCtrl.students = studentList;
        }
    }
    // $http({
    //     method: "GET",
    //     url: "/api/students",
    //     headers: {
    //         'Content-Type': 'application/json;',
    //     }
    // })

});

myapp.controller("studentDetailsController", function ($scope, $routeParams, $http) {
    console.log("routeParams::::::::::", $routeParams);
    var parmas = { id: $routeParams.id }
    $http.get("/api/students/" + parmas.id)
        .then(function (response) {
            if (response.data && response.data.data) {
                $scope.student = response.data.data[0];
            }
        });


});