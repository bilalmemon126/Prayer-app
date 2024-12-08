setInterval(function () {
    let a = moment().format('hh : mm : ss A')
    document.querySelector('.clock').innerHTML = a;
}, 1000)





let fajr = document.querySelector('.fajrtime');
let dhuhr = document.querySelector('.dhuhrtime');
let asr = document.querySelector('.asrtime');
let maghrib = document.querySelector('.maghribtime');
let isha = document.querySelector('.ishatime');

let hijriMonth = document.querySelector('.hijriMonth');
let hijriYear = document.querySelector('.hijriYear');
let datetime = document.querySelector('.datetime');
let timeZone = document.querySelector('.timeZone');


function getPrayerTime(){
    let city = document.querySelector('#city').value;
    let country = document.querySelector('#country').value;
    let method = 3;
    let comingtime = document.querySelector('.comingtime');
    let comingtime1 = document.querySelector('.comingtime1');
    axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`)
        .then(function (response) {
            // handle success
            console.log(response);
            f_prayer = fajr.innerHTML = response.data.data.timings.Fajr;
            d_prayer = dhuhr.innerHTML = response.data.data.timings.Dhuhr;
            a_prayer = asr.innerHTML = response.data.data.timings.Asr;
            m_prayer = maghrib.innerHTML = response.data.data.timings.Maghrib;
            i_prayer = isha.innerHTML = response.data.data.timings.Isha;
            
            hijriMonth.innerHTML = response.data.data.date.hijri.month.ar;
            hijriYear.innerHTML = response.data.data.date.hijri.date;
            datetime.innerHTML = response.data.data.date.readable;
            timeZone.innerHTML = response.data.data.meta.timezone;

            if(fajr >= f_prayer){
                comingtime.innerHTML = 'Dhuhr';
                comingtime1.innerHTML = response.data.data.timings.Dhuhr;
            }
            if(dhuhr >= d_prayer){
                comingtime.innerHTML = 'Asr';
                comingtime1.innerHTML = response.data.data.timings.Asr;
            }
            if(asr >= a_prayer){
                comingtime.innerHTML = 'Maghrib';
                comingtime1.innerHTML = response.data.data.timings.Maghrib;
            }
            if(maghrib >= m_prayer){
                comingtime.innerHTML = 'Isha';
                comingtime1.innerHTML = response.data.data.timings.Isha;
            }
            if(isha >= i_prayer){
                comingtime.innerHTML = 'Fajr';
                comingtime1.innerHTML = response.data.data.timings.Fajr;
            }
        })
        .catch(function (error) {
            // handle error
            comingtime.innerHTML = 'Not Found';
            console.log(error);
        })
}