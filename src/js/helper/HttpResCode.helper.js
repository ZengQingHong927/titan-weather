
var errResCodeInfos = function (errRes)
{

        let     resobj          = null

        switch (errRes.status.toString()) {
                case '403':
                        // todo: handler server forbidden error
                        break;
                case '409':
                        // console.log ('409::', errRes.data)
                        resobj = {status: errRes.status.toString(), item: errRes.item}
                        break;
                // todo: handler other status code
                default:
                        break;
        }

        return resobj
}

// function errReqInfos (errReq) {

//         let     resobj          = null;

//         if (errReq.readyState === 4 && errReq.status === 0) {
//                 // 当一个请求在上面的timeout属性中设置的时间内没有完成，则触发超时错误
//                 // resobj          = {status: }
//         }
// }

export default {
        errResCodeInfos,
};