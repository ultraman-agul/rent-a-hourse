import http from './http'

export const getCurrentCity = () => {
    const localCity = JSON.parse(localStorage.getItem('currentCity'))
    // 如果localstorage没有则发起请求
    if (!localCity) {
        return new Promise((resolve, reject) => {
            const curCity = new window.BMapGL.LocalCity()
            curCity.get(async res => {
                try {
                    const result = await http.get('/area/info', {
                        params: res.name
                    })
                    console.log(result)
                    resolve(result.data.body)
                    localStorage.setItem('currentCity', JSON.stringify(result.data.body))
                } catch (e) {
                    reject(e)
                }
            })
        })
    } else {
        return Promise.resolve(localCity)
    }
}