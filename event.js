const eventDatesYearly = [
    {
        date: dateRange(7, 1, 7, 31),
        dateInText: '7/1 - 7/31',
        name: '迪米生日月!',
        description: '現在有2倍閃5倍經驗!',
        nameEN: "Dimi's Birthday Month!",
        descriptionEN: "Sparkles x2, XP x5!",
        id: 'birthday',
        fontColor: '#000',
        color: 'linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #88ff00, #00ff00, #00ff88, #00ffff, #0088ff, #0000ff, #8800ff, #ff00ff, #ff0000)',
        customGradient: true,
        event: () => {
            if (date(7, 26)) {
                pd(characters[0], '聽說今天是迪米生日')
                pd(characters[0], '我們祝他生日快樂吧!')
                pd(characters[0], '生日快樂!', 100, () => {
                    confetti({
                        particleCount: antilag ? 50 : 200,
                        spread: 360,
                        origin: { y: 0.6 },
                    });
                    giveAch('birthday')
                })
                dialogue(dialogueQueue)
            }
            birthdayParty();
            sparkleMultiplier *= 2;
            xpMultiplier *= 5;
            showNotif("是迪米生日! 現在有2倍閃5倍經驗!", 10);
        }
    },
    {
        date: dateRange(2, 1, 2, 31),
        dateInText: '2/1 - 2/31',
        name: '遊戲周年慶!',
        description: '現在有2倍閃5倍經驗! (2024/2/6 創建的遊戲)',
        nameEN: "Game anniversary!",
        descriptionEN: "Sparkles x2, XP x5!",
        id: 'gameBirthday',
        fontColor: '#000',
        color: 'linear-gradient(90deg, #ff0000, #ff8800, #ffff00, #88ff00, #00ff00, #00ff88, #00ffff, #0088ff, #0000ff, #8800ff, #ff00ff, #ff0000)',
        customGradient: true,
        event: () => {
            birthdayParty();
            sparkleMultiplier *= 2;
            xpMultiplier *= 5;
            showNotif("遊戲周年慶! 現在有2倍閃5倍經驗!", 10);
        }
    },
    {
        date: dateRange(12, 1, 12, 31) || dateRange(1, 1, 1, 15),
        dateInText: '12/1 - 1/15',
        name: '冬天活動!',
        description: '雙倍經驗和閃! 周末會疊加',
        nameEN: "Happy Winter Vacation!",
        descriptionEN: "Have fun! Sparkles x2, XP x2!",
        id: 'winter',
        color: 'aqua',
        fontColor: '#000',
        thumbnail: url + '/themes/thumbnail/snowy.png',
        event: () => {
            snow()
            xpMultiplier *= 2;
            sparkleMultiplier *= 2;
        }
    },
    {
        date: dateRange(7, 1, 8, 31),
        dateInText: '7/1 - 8/31',
        name: '暑假!',
        description: '住你們放假快樂啊! 雙倍經驗和閃!',
        nameEN: "Happy Summer Vacation!",
        descriptionEN: "Have fun! Sparkles x2, XP x2!",
        id: 'Summer',
        color: '#ff0',
        fontColor: '#000',
        thumbnail: '../images/events/summer.png',
        event: () => {
            xpMultiplier *= 2;
            sparkleMultiplier *= 2;
        }
    },
    {
        date: date(3, 14),
        dateInText: '3/14',
        name: 'π!',
        description: '圓周率日! 雙倍經驗!',
        nameEN: 'π!',
        descriptionEN: "Double XP!",
        id: 'pi',
        thumbnail: '../images/events/pi.png',
        event: () => {
            xpMultiplier *= 2;
        }
    },
    {
        date: new Date().getDay() === 6 || new Date().getDay() === 0,
        dateInText: '週六、日',
        dateInEN: 'Saterdays and Sundays',
        name: '雙倍經驗周末!',
        description: '經驗值雙倍! 可與其他活動疊加!',
        nameEN: 'Double XP Weekends!',
        descriptionEN: "Double XP!",
        id: 'Weekend',
        thumbnail: '../images/events/weekend.png',
        event: () => {
            xpMultiplier *= 2;
            showNotif('是雙倍經驗周末!')
        }
    },
    {
        date: lunarDateRange(12, 29, 12, 31) || lunarDateRange(1, 1, 1, 15),
        dateInText: '農曆12/29~1/15',
        dateInEN: '12/29~1/15 (Lunar calendar date)',
        name: '農曆新年!',
        description: '春節來了~~~ 雙倍經驗和閃!',
        nameEN: 'Happy lunar new year!',
        descriptionEN: "Double XP and sparkles! (The Manderin version shares the same events and themes.)",
        id: 'LunarNewYear',
        thumbnail: url + 'themes/thumbnail/lunarny.png',
        color: 'linear-gradient(90deg, #d00 10px, #3c0000 60%, #00000000)',
        fontColor: '#ffaf00',
        customGradient: true,
        event: () => {
            xpMultiplier *= 2;
            sparkleMultiplier *= 2;
            newYearsConfetti()
        }
    }
]

$.each(eventDatesYearly, (i, event) => {
    if (!event.date) return;
    let name = $('html')[0].lang === 'en' ? event.nameEN : event.name
    let description = $('html')[0].lang === 'en' ? event.descriptionEN : event.description
    let dateInText = ($('html')[0].lang === 'en' && event.dateInEN) ? event.dateInEN : event.dateInText
    event.event()
    $('.indicator').text('')
    $('.event-list')[0].innerHTML += `
                <div class="card ${event.id}">
                    <div class="ei">
                        <h2>${name}</h2>
                        <p>${description}</p>
                        <p>${$('html')[0].lang === 'en' ?'Date':'日期'}: ${dateInText}</p>
                    </div>
                    <div class="eg"></div>
                    <img src="${event.thumbnail || '../themes/thumbnail/thumbnail-placeholder.png'}">
                </div>`
    if (event.color) {
        $("." + event.id)[0].style.background = event.color
        if (!event.customGradient) $(`.${event.id} .eg`)[0].style.background = `linear-gradient(90deg, ${event.color} 70%, #00000000)`
        else $(`.${event.id} .eg`)[0].style.background = event.color
    }
    if (event.fontColor) {
        $(`.${event.id} .ei`)[0].style.color = event.fontColor
    }
})