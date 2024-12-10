const eventDatesYearly = [
    {
        date: dateRange(7, 1, 7, 31),
        dateInText: '7/1 - 7/31',
        name: '迪米生日月!',
        description: '現在有2倍閃5倍經驗!',
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
        id: 'winter',
        color: 'aqua',
        fontColor: '#000',
        thumbnail: '../themes/thumbnail/snowy.png',
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
        id: 'pi',
        thumbnail: '../images/events/pi.png',
        event: () => {
            xpMultiplier *= 2;
        }
    },
    {
        date: new Date().getDay() === 6 || new Date().getDay() === 0,
        dateInText: '週六、日',
        name: '雙倍經驗周末!',
        description: '經驗值雙倍! 可與其他活動疊加!',
        id: 'Weekend',
        thumbnail: '../images/events/weekend.png',
        event: () => {
            xpMultiplier *= 2;
            showNotif('是雙倍經驗周末!')
        }
    },
]

$.each(eventDatesYearly, (i, event) => {
    if (!event.date) return;
    event.event()
    $('.indicator').text('')
    $('.event-list')[0].innerHTML += `
                <div class="card ${event.id}">
                    <div class="ei">
                        <h2>${event.name}</h2>
                        <p>${event.description}</p>
                        <p>日期: ${event.dateInText}</p>
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