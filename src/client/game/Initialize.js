import _ from 'underscore';

export default function init() {
    _.mixin({
        combine: function(){
            return _.reduce(Array.prototype.slice.call(arguments, 1),function(ret,newarr){
                return _.reduce(ret,function(memo,oldi){
                    return memo.concat(_.map(newarr,function(newi){
                        return oldi.concat(newi);
                    }));
                },[]);
            },_.map(arguments[0],function(i){return [i];}));
        }
    })
};