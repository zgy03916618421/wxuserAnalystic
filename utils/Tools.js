/**
 * Created by Administrator on 2016/8/30.
 */
exports.isEmpty = function (obj) {
    if (
        obj == null ||
        typeof (obj) === "undefined" ||
        obj === undefined ||
        obj.length == 0 ||
        obj === "null" || obj == {} ||
        (typeof obj == "object" && JSON.stringify(obj)=="{}")
    ) {
        return true;
    }
    return false;
}