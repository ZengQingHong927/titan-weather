
var formatCNY = function (val) {
        let     fixed = `￥${((val || 0) / 100).toFixed (2)}`;
        return  numberWithCommas (fixed);
}

var formatNTD = function (val) {
        let     fixed           = `${((val || 0) / 100).toFixed (2)}`;
        let     newFixed        = numberWithCommas (fixed);
        return `${newFixed}`;
}

var numberWithCommas    = function (val) {
        let     parts = val.toString ().split ('.');
        return  parts[0].replace (/\B(?=(\d{3})+(?=$))/g, ',') + (parts[1] ? '.' + parts[1] : '');
}

var formatDeltms        = function (val) {
        if (typeof val === 'undefined')         return '-';
        let     deltSec = val / 1000;
        let     nHour   = ~~(deltSec / 3600);
        let     nMin    = ~~(deltSec % 3600 / 60);
        let     nSec    = ~~(deltSec % 3600 % 60);

        let     str     = '';
        if (nHour)      str += `${nHour}小時`;
        if (nMin)       str += `${nMin}分`;
        if (nSec)       str += `${nSec}秒`;
        return str;
}

var calcRestTime        = function (val) {
        if (!val)       return '-';
        let     nowms = Date.now ();
        let     valms = new Date (val).getTime ();
        if (nowms > valms)      return '已超時';
        return  formatDeltms (valms - nowms);
}

var calcDeltsec         = function (date0, date1) {
        if (!date0 || date1)    return '-';

        let deltams = new Date (date0).getTime () - new Date (date1).getTime ();
        return  `${(deltams / 1000).toFixed (2)}秒`;
}

var percentage          = function (val, fixed) {
        if (val === Infinity) return '';
        return `${((val || 0) * 100).toFixed (fixed || 0)}%`
}

var loginAccountStatus  = function (val) {
        let     statusMap = {
                11000:  '新建',
                12000:  '等待提交驗證碼',
                13000:  '驗證碼已提交',
                14000:  '登入中',
                15000:  '登出',
        };

        return  val === -1 ? '未知類型' : statusMap[val];
}

var formatLocalDate      = function (val, info, tzoff0)
{
    // let     tzoff           = tzoff0 || new Date ().getTimezoneOffset ();
    let     tzoff           = tzoff0 || -8*60;  // CHN standard time
    let     localdate       = new Date (new Date (val || 0).getTime () - tzoff*60000);
    return localdate.toISOString ().replace ('T', ' ').replace ('Z', '').substr (0, 19);
};

function formatMsgTime (date) {
        // console.log (`- date ${date}`)
        // var D, y, m, d, h, min, s;
        var D, y, m, d, h, min, s;
        var DNow, yNow, mNow, dNow, hNow, minNow, sNow;
        
        DNow    = new Date ();
        yNow    = DNow.getFullYear ();
        mNow    = DNow.getMonth ();
        dNow    = DNow.getDate ();
        hNow    = DNow.getHours ();
        minNow  = DNow.getMinutes ();
        sNow    = DNow.getSeconds ();


        if (date !== '' && typeof date !== 'undefined') {
                D       = new Date (date);
                y       = D.getFullYear ();
                m       = D.getMonth ();
                d       = D.getDate ();
                h       = D.getHours ();
                min     = D.getMinutes ();
                s       = D.getSeconds ();
                // console.log (` y:${y}, m:${m}, d:${d}, h:${h}, min:${min}, s:${s}`);
        }
        else {
                y       = yNow;
                m       = mNow;
                d       = dNow;
                D       = DNow
        }

        if (yNow === y && mNow === m && dNow === d) {
                return formatAMPM (D);
        }
        else if (y === y && m === m && (dNow-1) === d ) {
                return `昨日 ${formatAMPM(D)}`;
        }
        else if (y === y && m === m && (dNow-8) < d && d < (dNow-1)) {
                let week = formatWeek(D.getDay ());
                return `${week} ${formatAMPM (D)}`;
        }
        else {
                return `${formatMonth (m)} ${d}, ${y}`;
        }
}

function formatMonth (val) {

        let     monthMap = {
                '0':    'January',
                '1':    'Febuary',
                '2':    'March',
                '3':    'April',
                '4':    'May',
                '5':    'June',
                '6':    'July',
                '7':    'August',
                '8':    'September',
                '9':    'October',
                '10':   'November',
                '11':   'December',
        }

        return monthMap[val];

}

function formatWeek (val) {
        if (val === 0) return 'Mon';
        if (val === 1) return 'Tue';
        if (val === 2) return 'Wed';
        if (val === 3) return 'Thu';
        if (val === 4) return 'Fri';
        if (val === 5) return 'Sat';
        if (val === 6) return 'Sun';
}

function formatLocalWeek (date) {
        let     D       = new Date (date);
        let     week    = formatWeek(D.getDay ());
        return week
}

function formatAMPM (date, unit) {
        
        if (!(date instanceof Date))   date = new Date(date)
        
        let hours = date.getHours ();
        let minutes = date.getMinutes ();
        let seconds = date.getSeconds ();
        let ampm = (hours > 12 || hours === 0) ? 'PM' : 'AM';
        hours = (hours !== 12 && hours !== 0) ? hours%12 : (hours === 0 ? 12 : hours);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (unit && unit === 'hrs')     return hours + ':00' + ' ' + ampm;

        return hours + ':' + minutes + ':' + seconds + ' ' + ampm;
}

function countryInfos () {
        // country list
        const countryMap = new Map(
                Object.entries({
                'AF': 'Afghanistan',
                'AX': 'Åland Islands',
                'AL': 'Albania',
                'DZ': 'Algeria',
                'AS': 'American Samoa',
                'AD': 'Andorra',
                'AO': 'Angola',
                'AI': 'Anguilla',
                'AQ': 'Antarctica',
                'AG': 'Antigua and Barbuda',
                'AR': 'Argentina',
                'AM': 'Armenia',
                'AW': 'Aruba',
                'AU': 'Australia',
                'AT': 'Austria',
                'AZ': 'Azerbaijan',
                'BS': 'Bahamas',
                'BH': 'Bahrain',
                'BD': 'Bangladesh',
                'BB': 'Barbados',
                'BY': 'Belarus',
                'BE': 'Belgium',
                'BZ': 'Belize',
                'BJ': 'Benin',
                'BM': 'Bermuda',
                'BT': 'Bhutan',
                'BO': 'Bolivia',
                'BA': 'Bosnia and Herzegovina',
                'BW': 'Botswana',
                'BV': 'Bouvet Island',
                'BR': 'Brazil',
                'IO': 'British Indian Ocean Territory',
                'BN': 'Brunei Darussalam',
                'BG': 'Bulgaria',
                'BF': 'Burkina Faso',
                'BI': 'Burundi',
                'KH': 'Cambodia',
                'CM': 'Cameroon',
                'CA': 'Canada',
                'CV': 'Cape Verde',
                'KY': 'Cayman Islands',
                'CF': 'Central African Republic',
                'TD': 'Chad',
                'CL': 'Chile',
                'CN': 'China',
                'CX': 'Christmas Island',
                'CC': 'Cocos (Keeling) Islands',
                'CO': 'Colombia',
                'KM': 'Comoros',
                'CG': 'Congo',
                'CD': 'Congo, The Democratic Republic of the',
                'CK': 'Cook Islands',
                'CR': 'Costa Rica',
                'CI': "Cote D'Ivoire",
                'HR': 'Croatia',
                'CU': 'Cuba',
                'CY': 'Cyprus',
                'CZ': 'Czech Republic',
                'DK': 'Denmark',
                'DJ': 'Djibouti',
                'DM': 'Dominica',
                'DO': 'Dominican Republic',
                'EC': 'Ecuador',
                'EG': 'Egypt',
                'SV': 'El Salvador',
                'GQ': 'Equatorial Guinea',
                'ER': 'Eritrea',
                'EE': 'Estonia',
                'ET': 'Ethiopia',
                'FK': 'Falkland Islands (Malvinas)',
                'FO': 'Faroe Islands',
                'FJ': 'Fiji',
                'FI': 'Finland',
                'FR': 'France',
                'GF': 'French Guiana',
                'PF': 'French Polynesia',
                'TF': 'French Southern Territories',
                'GA': 'Gabon',
                'GM': 'Gambia',
                'GE': 'Georgia',
                'DE': 'Germany',
                'GH': 'Ghana',
                'GI': 'Gibraltar',
                'GR': 'Greece',
                'GL': 'Greenland',
                'GD': 'Grenada',
                'GP': 'Guadeloupe',
                'GU': 'Guam',
                'GT': 'Guatemala',
                'GG': 'Guernsey',
                'GN': 'Guinea',
                'GW': 'Guinea-Bissau',
                'GY': 'Guyana',
                'HT': 'Haiti',
                'HM': 'Heard Island and Mcdonald Islands',
                'VA': 'Holy See (Vatican City State)',
                'HN': 'Honduras',
                'HK': 'Hong Kong',
                'HU': 'Hungary',
                'IS': 'Iceland',
                'IN': 'India',
                'ID': 'Indonesia',
                'IR': 'Iran, Islamic Republic Of',
                'IQ': 'Iraq',
                'IE': 'Ireland',
                'IM': 'Isle of Man',
                'IL': 'Israel',
                'IT': 'Italy',
                'JM': 'Jamaica',
                'JP': 'Japan',
                'JE': 'Jersey',
                'JO': 'Jordan',
                'KZ': 'Kazakhstan',
                'KE': 'Kenya',
                'KI': 'Kiribati',
                'KP': "Democratic People's Republic of Korea",
                'KR': 'Korea, Republic of',
                'XK': 'Kosovo',
                'KW': 'Kuwait',
                'KG': 'Kyrgyzstan',
                'LA': "Lao People's Democratic Republic",
                'LV': 'Latvia',
                'LB': 'Lebanon',
                'LS': 'Lesotho',
                'LR': 'Liberia',
                'LY': 'Libyan Arab Jamahiriya',
                'LI': 'Liechtenstein',
                'LT': 'Lithuania',
                'LU': 'Luxembourg',
                'MO': 'Macao',
                'MK': 'Macedonia, The Former Yugoslav Republic of',
                'MG': 'Madagascar',
                'MW': 'Malawi',
                'MY': 'Malaysia',
                'MV': 'Maldives',
                'ML': 'Mali',
                'MT': 'Malta',
                'MH': 'Marshall Islands',
                'MQ': 'Martinique',
                'MR': 'Mauritania',
                'MU': 'Mauritius',
                'YT': 'Mayotte',
                'MX': 'Mexico',
                'FM': 'Micronesia, Federated States of',
                'MD': 'Moldova, Republic of',
                'MC': 'Monaco',
                'MN': 'Mongolia',
                'ME': 'Montenegro',
                'MS': 'Montserrat',
                'MA': 'Morocco',
                'MZ': 'Mozambique',
                'MM': 'Myanmar',
                'NA': 'Namibia',
                'NR': 'Nauru',
                'NP': 'Nepal',
                'NL': 'Netherlands',
                'AN': 'Netherlands Antilles',
                'NC': 'New Caledonia',
                'NZ': 'New Zealand',
                'NI': 'Nicaragua',
                'NE': 'Niger',
                'NG': 'Nigeria',
                'NU': 'Niue',
                'NF': 'Norfolk Island',
                'MP': 'Northern Mariana Islands',
                'NO': 'Norway',
                'OM': 'Oman',
                'PK': 'Pakistan',
                'PW': 'Palau',
                'PS': 'Palestinian Territory, Occupied',
                'PA': 'Panama',
                'PG': 'Papua New Guinea',
                'PY': 'Paraguay',
                'PE': 'Peru',
                'PH': 'Philippines',
                'PN': 'Pitcairn',
                'PL': 'Poland',
                'PT': 'Portugal',
                'PR': 'Puerto Rico',
                'QA': 'Qatar',
                'RE': 'Reunion',
                'RO': 'Romania',
                'RU': 'Russian Federation',
                'RW': 'Rwanda',
                'SH': 'Saint Helena',
                'KN': 'Saint Kitts and Nevis',
                'LC': 'Saint Lucia',
                'PM': 'Saint Pierre and Miquelon',
                'VC': 'Saint Vincent and the Grenadines',
                'WS': 'Samoa',
                'SM': 'San Marino',
                'ST': 'Sao Tome and Principe',
                'SA': 'Saudi Arabia',
                'SN': 'Senegal',
                'RS': 'Serbia',
                'SC': 'Seychelles',
                'SL': 'Sierra Leone',
                'SG': 'Singapore',
                'SK': 'Slovakia',
                'SI': 'Slovenia',
                'SB': 'Solomon Islands',
                'SO': 'Somalia',
                'ZA': 'South Africa',
                'GS': 'South Georgia and the South Sandwich Islands',
                'ES': 'Spain',
                'LK': 'Sri Lanka',
                'SD': 'Sudan',
                'SR': 'Suriname',
                'SJ': 'Svalbard and Jan Mayen',
                'SZ': 'Swaziland',
                'SE': 'Sweden',
                'CH': 'Switzerland',
                'SY': 'Syrian Arab Republic',
                'TW': 'Taiwan',
                'TJ': 'Tajikistan',
                'TZ': 'Tanzania, United Republic of',
                'TH': 'Thailand',
                'TL': 'Timor-Leste',
                'TG': 'Togo',
                'TK': 'Tokelau',
                'TO': 'Tonga',
                'TT': 'Trinidad and Tobago',
                'TN': 'Tunisia',
                'TR': 'Turkey',
                'TM': 'Turkmenistan',
                'TC': 'Turks and Caicos Islands',
                'TV': 'Tuvalu',
                'UG': 'Uganda',
                'UA': 'Ukraine',
                'AE': 'United Arab Emirates',
                'GB': 'United Kingdom',
                'US': 'United States',
                'UM': 'United States Minor Outlying Islands',
                'UY': 'Uruguay',
                'UZ': 'Uzbekistan',
                'VU': 'Vanuatu',
                'VE': 'Venezuela',
                'VN': 'Viet Nam',
                'VG': 'Virgin Islands, British',
                'VI': 'Virgin Islands, U.S.',
                'WF': 'Wallis and Futuna',
                'EH': 'Western Sahara',
                'YE': 'Yemen',
                'ZM': 'Zambia',
                'ZW': 'Zimbabwe',
                })
        )

        return countryMap;
}

function genderInfos () {
        
        let gender = {
                male:           { label: 'Male', name: 'male', code: 'M' },
                female:         { label: 'Female', name: 'female', code: 'F' },
                transgender:    { label: 'Transgender', name: 'trans', code: 'T' },
                other:          { label: 'Other', name: 'other', code: 'O' },
        }
        
        
        return gender;
}

module.exports = {
        formatCNY,
        formatNTD,
        numberWithCommas,
        formatLocalDate,
        formatLocalWeek,
        formatDeltms,
        calcRestTime,
        calcDeltsec,
        percentage,
        loginAccountStatus,
        formatAMPM,
        formatMsgTime,
        formatWeek,
        countryInfos,
        genderInfos,
}