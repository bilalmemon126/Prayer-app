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


function getPrayerTime() {
    let city = document.querySelector('#city').value;
    let country = document.querySelector('#country').value;
    let method = 3;
    let comingtime = document.querySelector('.comingtime');
    let comingtime1 = document.querySelector('.comingtime1');
    axios.get(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`)
        .then(function (response) {
            // handle success
            f_prayer = fajr.innerHTML = response.data.data.timings.Fajr;
            d_prayer = dhuhr.innerHTML = response.data.data.timings.Dhuhr;
            a_prayer = asr.innerHTML = response.data.data.timings.Asr;
            m_prayer = maghrib.innerHTML = response.data.data.timings.Maghrib;
            i_prayer = isha.innerHTML = response.data.data.timings.Isha;

            hijriMonth.innerHTML = response.data.data.date.hijri.month.ar;
            hijriYear.innerHTML = response.data.data.date.hijri.date;
            datetime.innerHTML = response.data.data.date.readable;
            timeZone.innerHTML = response.data.data.meta.timezone;


            function toMinutes(timeString) {
                let [hours, minutes] = timeString.split(':').map(Number);
                return hours * 60 + minutes;
            }

            f_minutes = toMinutes(f_prayer)
            d_minutes = toMinutes(d_prayer)
            a_minutes = toMinutes(a_prayer)
            m_minutes = toMinutes(m_prayer)
            i_minutes = toMinutes(i_prayer)

            time = toMinutes(moment().format('HH : mm'))
            
            if(time >= f_minutes && time < d_minutes){
                comingtime.innerHTML = 'Dhuhr';
                comingtime1.innerHTML = response.data.data.timings.Dhuhr;
            }
            else if(time >= d_minutes && time < a_minutes){
                comingtime.innerHTML = 'Asr';
                comingtime1.innerHTML = response.data.data.timings.Asr;
            }
            else if(time >= a_minutes && time < m_minutes){
                comingtime.innerHTML = 'Maghrib';
                comingtime1.innerHTML = response.data.data.timings.Maghrib;
            }
            else if(time >= m_minutes && time < i_minutes){
                comingtime.innerHTML = 'Isha';
                comingtime1.innerHTML = response.data.data.timings.Isha;
            }
            else{
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