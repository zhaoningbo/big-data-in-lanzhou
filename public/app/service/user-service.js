/**
 * Created by paul on 15-9-17.
 */

angular.module('technicalSalon')
    .factory('UserService',function($resource) {
        return $resource('/user/:id')
    })


