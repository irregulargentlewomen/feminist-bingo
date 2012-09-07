(function ($) {
    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

    // The following section of code contains the source text for each bingo square. Each line takes the form
    //   ['(slug)', "(square text)", "(rebuttal text)"],
    // The "slug" should be a quick placeholder word describing the content of the square.
    // If more than one word is needed, join them with hyphens - it won't work if you insert spaces.
    // If you need to include double-quotes in any square or rebuttal (for example, to insert a hyperlink), then "escape" the quote like so - \". Since 
    var sourceArray = [
        ['feminine', "But I like my women feminine.", "That doesn't give you the right to impose a standard of beauty on anyone else."],
        ['equalist', "Feminists have got it all wrong; I'm an equalist.", "While there are certainly reasons not to identify with the mainstream feminist movement &mdash; see also <a href=\"http://en.wikipedia.org/wiki/Womanism\">womanism</a> &mdash; there's a difference between legitimate critiques and erasing misogyny."],
        ['naturally-better', "Women are just naturally better at that stuff.", "Women are individuals, with individual strengths and weaknesses."],
        ['explain-it-to-me', "So if you know all about feminism, explain it to me.", "No one owes you an education. If you want to learn, <a href=\"http://lmgtfy.com/?q=feminism+101\">you can google it</a>."],
        ['patriarchy-hurts-men', "Patriarchy hurts men too!", "Patriarchy does hurt men. But right now, that's not what I want to talk about. You have the rest of the world to talk about men."],
        ['ruin-sex-for-everyone-else', "You just don't like sex, so you want to spoil it for everyone else.", "Other people's sex lives are not my problem."],
        ['rape-is-rare', "Rape is rare. You're just paranoid.", "<a href=\"http://www.rainn.org/get-information/statistics/frequency-of-sexual-assault\">Every two minutes, someone in the United States is sexually assaulted.</a>"],
        ['gave-it-away', "She gave it away plenty of times before.", "Having had sex before doesn't take away your right to consent."],
        ['gave-you-the-vote', "We gave you the vote, now shut up.", "Suffrage isn't the only way to use my voice, and it wasn't the only goal of the women's rights movement."],
        ['treated-like-a-lady', "If you want to be treated like a lady, you'd better start acting like one.", "I'd rather be treated as a <em>person</em>."],
        ['objective-about-gender-issues', "Women just can't be objective about gender issues.", "Then neither can men."],
        ['laid', "You'll never get laid with that attitude.", "My attitude is the sexiest thing about me."],
        ['take-a-joke', "Can't you take a joke?", "Tell me something funny, and we'll see if I can take a joke."],
        ['feminists-a-bad-name', "You give feminists a bad name.", "Feminism is bigger and more complicated then just me."],
        ['old-fashioned-gentleman', "I'm just an old-fashioned gentleman.", "Causing other people pain has never been in fashion, nor is it gentle, especially when you know better."],
        ['cute-when-angry', "You're so cute when you're angry.", "You're so condescending when you're afraid of my point."],
        ['that-time-of-the-month', "Is it that time of the month?", "My feelings are real, even if it is \"that time of the month.\" (It's called a menstrual period, by the way. For future reference.) And it's rude to ask someone about her medical details."],
        ['victim-mentality', "You've just got a victim mentality.", "You've just got a lot of luck, and are afraid to admit how much it benefits you."],
        ['good-deep-dicking', "All you feminists need is a good deep-dicking.", "All I need is for the world to stop oppressing me because of my gender."],
        ['overemotional', "You're being silly and overemotional.", "You're being condescending as an excuse not to listen to me."],
        ['jelly-of-lust', "Women have all the power over men &mdash; you can reduce us to an uncontrollable jelly of lust!", "You clearly don't think much of men if you think they can't control themselves."],
        ['feminists-hate-men', "You feminists all hate men!", "Feminists are not a <a href=\"http://geekfeminism.wikia.com/wiki/Hive_vagina\">Hive Vagina</a>."],
        ['nice-guy', "But I'm a nice guy!", "Being nice doesn't mean any individual woman owes you anything."],
        ['wrong-with-feminism', "I'll tell you what's wrong with feminism...", "The feminist movement has and has had a number of problems, and feminists are aware of them."],
        ['listen-to-me', "But I want to talk about this. Listen to me!", "I don't owe you my attention."],
        ['what-more-do-you-want', "He said he was sorry! What more do you want?", "An apology is a good start &mdash; if it's sincere &mdash; but it's not the end of fixing damage."],
        ['drunk', "Why were you <em>drunk</em>? You should know better than to be drunk anywhere unless you're sure it's safe!", "Choosing to drink doesn't equal choosing to be assaulted."],
        ['just-groping', "It was just stupid groping! It's not like he <em>actually</em>...", "There is no sliding scale to consent."],
        ['fight-harder', "Why didn't you fight him off? Well, why didn't you fight <em>harder</em>?", "It is not the victim's fault that someone chose to hurt him or her."],
        ['ruin-his-life', "If you keep this up, you're going to ruin his life.", "I'm not doing anything. He decided to commit a crime. All I want is justice."],
        ['tawana-brawley', "Can you say \"Duke lacrosse team\"?", "The plural of anecdote is not data. <a href=\"http://www.rainn.org/get-information/statistics/reporting-rates\">54% of rapes</a> are not reported."],
        ['manga', "Just read manga like the rest of the girls.", "Gender doesn't determine what I enjoy'"],
        ['jealous', "You're only jealous because you don't look like that.", "<em>No one</em> looks like that without a lot of artists working very hard behind the scenes."],
        ['dont-read-it', "If you don't like it, don't read it.", "The social narrative of what women are expected to do and be isn't something I can avoid."],
        ['censorship', "That's censorship!", "The right to free speech isn't the right to avoid being called on your bullshit."],
        ['realism-in-media', "No one wants realism in media.", "There's room for both realism and escapism in media."],
        ['happens-in-real-life', "But rape happens in real life too!", "Real-life rape is a crime, and fictional rape shouldn't be reduced to a plot device."],
        ['punished-for-biology', "Men can't help themselves. Why are you punishing us for our biology?", "I give men more credit than to claim they're helpless slaves to their hormones."],
        ['oppression-olympics', "Why are you complaining about this when women in Muslim countries are oppressed?", "Don't play <a href=\"www.urbandictionary.com/define.php?term=Oppression%20Olympics\">Oppression Olympics</a>. There's no gold medal at the end."],
        ['just-not-good-enough', "There aren't many women in the field because they're just not good enough.", "Fields which implement gender-blind hiring practices <a href=\"http://www.princeton.edu/pr/pwb/97/0512/0512-orchestra.html\">demonstrate</a> that truly merit-based hiring is gender-equal."],
        ['just-not-interested', "There aren't many women in the field because they're just not interested.", "I wouldn't be interested in a field that was full of willful ignorance."],
        ['misogynist', "Are you calling me a misogynist?!", "I'm not talking about you at all. I'm talking about systemic oppression of women based on nothing more than their gender."],
        ['asked-my-girlfriend', "I asked my girlfriend, and she isn't offended.", "I <em>am</em> offended, and you don't get to erase that."],
        ['human-nature', "Human nature is never going to change. You're just wasting your time.", "What human nature? Cultures vary widely across time and space."],
        ['abortion-breast-cancer', "Abortion causes breast cancer, you know.", "The <a href=\"http://www.cancer.gov/\">National Cancer Institute</a> <a href=\"http://www.cancer.gov/cancertopics/causes/ere/workshop-report\">says</a> it is \"well-established\" that \"Induced abortion is not associated with an increase in breast cancer risk.\""],
        ['just-dont-have-sex', "If you don't want to get pregnant, just don't have sex.", "We now have the technology to divorce reproduction and coitus, just as we now have the technology to divorce digging the Panama Canal and catching malaria."],
        ['children-are-womens-purpose', "Having children is a woman's purpose.", "I am more than my uterus."],
        ['once-met-a-woman', "I once met a woman who regretted her abortion.", "The American Psychological Association has <a href=\"http://www.apa.org/pi/women/programs/abortion/index.aspx\">found</a> no evidence that a single abortion harms a woman’s mental health. It also found that women who report distress post-abortion typically have other risk factors for mental health problems."],
        ['abortion-worse-than-rape', "Abortion is worse than rape.", "Please don't impose your opinions about morality on rape survivors."],
        ['love-it-if-a-babe', "I'd love it if a babe forced herself on me sexually.", "Not according to <a href=\"http://www.malesurvivor.org/speaking-out.html\">these male survivors</a>."],
        ['hysterical', "You're just hysterical.", "You're just patronizing."],
        ['rape-culture', "All this talk about rape culture stops women from being responsible for themselves.", "Rape is always the responsibility of the rapist."],
        ['too-old-to-change', "I know, it's bad, but I'm too old to change.", "You're using age as an excuse to go on hurting people."],
        ['gender-studies', "Why aren't there Men's Studies?", "There is; it's the rest of the mainstream educational curriculum."],
        ['compliment', "You should take it as a compliment!", "Don't tell me how to feel."],
        ['out-of-context', "It was out of context.", "The context was reality."],
        ['enjoy-being-offended', "You enjoy being offended.", "When I say I'm offended, you should hear that I'm hurt. It's painful, and it's not fun."],
        ['if-you-were-offended', "I'm sorry if you were offended.", "I just told you I was offended, there's no 'if' about it. Don't fauxpologize."],
        ['innocent-until-proven', "Whatever happened to innocent until proven guilty?", "Whatever happened to prosecuting crimes? <a href\"http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&ved=0CF4QFjAC&url=http%3A%2F%2Fwww.uky.edu%2FCRVAW%2Ffiles%2FTopTen%2F07_Rape_Prosecution.pdf&ei=RfLDT-WTGafg2QX8vsle&usg=AFQjCNH2w5EJQJst_pUhc1m1YKL6L9d2Eg\">37% of reported rapes are ever prosecuted</a>."],
        ['way-too-seriously', "You're just taking things way too seriously.", "This is a serious problem."],
        ['never-happened-to-me', "Well, that's never happened to me.", "Your experience doesn't trump mine."],
        ['bigots-will-die', "Just wait, and all the bigots will just die off on their own.", "The bigots are teaching their children bigotry."],
        ['sex-equals-gender', "Sex and gender are the same thing.", "Sex is a medical community's interpretation of sex organs; gender is what you do to convince society of your identity."],
        ['against-dissent', "You just don't like dissent.", "I value diversity of opinion, when everyone involved is arguing in good faith."],
        ['why-people-hate-feminists', "People like you are why people hate feminists.", "People like you are why feminism is necessary."],
        ['mean-anything', "He didn't mean anything by it.", "Intent isn't the point. The point is that a real person was hurt."],
        ['real-issue', "Feminism is a distraction from the real issue here.", "It's called intersectionality. Love it. Trust it."]
    ],

        // We're going to be doing this in a mostly functional style as opposed to an
        // object-oriented one. Once the squares are assembled, the only relevant data about
        // them is whether they're clicked or not (which is best handled by a simple true/false
        // array) and which retort in the retorts list they correspond to (which is best handled
        // by carrying it in data-* DOM attributes.) Building a bunch of Square objects might
        // make the code mildly neater, by some lights, but that small elegance gain is IMO
        // more than offset by the performance hit of maintaining all of that information in
        // memory uselessly.
        
        // tl;dr: your author was playing with knockout.js all weekend, loved it, and feels weird
        // about loving it because her first Javascript mentor was sufficiently performance-obsessed
        // that he hated JQuery.

        generateSquares = function (data) {
            var x, y, card = $('.card'),
                winList = $('.win ul'),
                randomSource = function () {
                    var index = Math.floor(Math.random() * sourceArray.length),
                        result = sourceArray[index];
                    sourceArray.remove(index);
                    return result;
                },

                sectionTag = function (x, y, slug, content) {
                    return '<section class="square" id="' + x + '-' + y + '"><span data-slug="' + slug + '">' + content + '</span></section>';
                },

                listTag = function (source) {
                    return '<li data-slug="' + source[0] + '"><span class="comment">' + source[1] + '</span><span class="retort">' + source[2] + '</span></li>';
                };

            eachGridElement(function (x, y) {
                if (x === 2 && y === 2) {
                    card.append(sectionTag(x, y, "free-space", "I would listen to you if you weren't so angry."));
                    $('#2-2').addClass('free filled');
                }
                else {
                    var source = randomSource();
                    card.append(sectionTag(x, y, source[0], source[1]));
                    winList.append(listTag(source));
                }
            });
        },

        eachGridElement = function (block) {
            for (x = 0; x < 5; x++) {
                for (y = 0; y < 5; y++) {
                    block(x, y);
                }
            }
        },

        getKittenVideo = function () {
            var url = "https://gdata.youtube.com/feeds/api/videos?q=cute+kitten&orderby=rating&max-results=1&v=2&alt=json&start-index=" + Math.floor(Math.random() * 100);
            $.get(url, function (data) {
                $('#video').attr('src', data.feed.entry[0].content.src);
            });
        },

        fillSquare = function (square) {
            square.addClass('filled');
            $(".win ul").find('.' + square.find('span').attr('class')).addClass("troll");

            // someday when I care that much I should probably make a custom event to trigger this
            checkForWin();
        },

        checkForWin = function () {
            var grid = [
                [],
                [],
                [],
                [],
                []
            ],
                trueIfAllTrue = function (array) {
                    for (var x = 0; x < array.length; x++) {
                        if (!array[x]) {
                            return false;
                        }
                    }
                    return true;
                },
                winConditions = [

                function () {
                    for (var x = 0; x < 5; x++) {
                        if (trueIfAllTrue(grid[x])) {
                            return true;
                        }
                    }
                    return false;
                }, function () {
                    var count;
                    for (var y = 0; y < 5; y++) {
                        count = 0;
                        for (var x = 0; x < 5; x++) {
                            if (grid[x][y]) {
                                count++;
                            }
                        }
                        if (count === 5) {
                            return true;
                        }
                    }
                    return false;
                }, function () {
                    for (var i = 0; i < 5; i++) {
                        if (!grid[i][i]) {
                            return false;
                        }
                    }
                    return true;
                }, function () {
                    for (var i = 0; i < 5; i++) {
                        if (!grid[4 - i][i]) {
                            return false;
                        }
                    }
                    return true;
                }];

            eachGridElement(function (x, y) {
                if ($('#' + x + '-' + y).hasClass('filled')) {
                    grid[x][y] = true;
                }
                else {
                    grid[x][y] = false;
                }
            });

            for (i = winConditions.length - 1; i >= 0; i--) {
                if (winConditions[i]()) {
                    win();
                    break;
                }
            }
        },

        win = function () {
            $('body').addClass("won");
        };

    $(document).ready(function () {
        generateSquares();

        $('.square').click(function () {
            fillSquare($(this));
        });

        getKittenVideo();
    });
})(jQuery);