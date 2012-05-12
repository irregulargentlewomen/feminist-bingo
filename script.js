(function($) {
  // Array Remove - By John Resig (MIT Licensed)
  Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
  };
  
  var sourceArray = [
        "<span class='feminine'>But I like my women feminine.</span>",
        "<span class='equalist'>Feminists have got it all wrong; I'm an equalist.</span>",
        "<span class='naturally-better'>Women are just naturally better at that stuff.</span>",
        "<span class='explain-it-to-me'>So if you know all about feminism, explain it to me.</span>",
        "<span class='patriarchy-hurts-men'>Patriarchy hurts men too!</span>",
        "<span class='ruin-sex-for-everyone-else'>You just don't like sex, so you want to spoil it for everyone else.</span>",
        "<span class='rape-is-rare'>Rape is rare. You're just paranoid.</span>",
        "<span class='gave-it-away'>She gave it away plenty of times before.</span>",
        "<span class='gave-you-the-vote'>We gave you the vote, now shut up.</span>",
        "<span class='treated-like-a-lady'>If you want to be treated like a lady, you'd better start acting like one.</span>",
        "<span class='objective-about-gender-issues'>Women just can't be objective about gender issues.</span>",
        "<span class='laid'>You'll never get laid with that attitude.</span>",
        "<span class='take-a-joke'>Can't you take a joke?</span>",
        "<span class='feminists-a-bad-name'>You give feminists a bad name.</span>",
        "<span class='old-fashioned-gentleman'>I'm just an old-fashioned gentleman.</span>",
        "<span class='cute-when-angry'>You're so cute when you're angry.</span>",
        "<span class='that-time-of-the-month'>Is it that time of the month?</span>",
        "<span class='victim-mentality'>You've just got a victim mentality.</span>",
        "<span class='good-deep-dicking'>All you feminists need is a good deep-dicking.</span>",
        "<span class='overemotional'>You're being silly and overemotional.</span>",
        "<span class='jelly-of-lust'>Women have all the power over men &mdash; you can reduce us to an uncontrollable jelly of lust!</span>",
        "<span class='feminists-hate-men'>You feminists all hate men!</span>",
        "<span class='nice-guy'>But I'm a nice guy!</span>",
        "<span class='wrong-with-feminism'>I'll tell you what's wrong with feminism...</span>",
        "<span class='listen-to-me'>But I want to talk about this. Listen to me!</span>",
        "<span class='what-more-do-you-want'>He said he was sorry! What more do you want?</span>",
        "<span class='drunk'>Why were you <em>drunk</em>? You should know better than to be drunk anywhere unless you're sure it's safe!</span>",
        "<span class='just-groping'>It was just stupid groping! It's not like he <em>actually</em>...</span>",
        "<span class='fight-harder'>Why didn't you fight him off? Well, why didn't you fight <em>harder</em>?</span>",
        "<span class='ruin-his-life'>If you keep this up, you're going to ruin his life.</span>",
        "<span class='tawana-brawley'>Can you say \"Tawana Brawley\"?</span>",
        "<span class='manga'>Just read manga like the rest of the girls.</span>",
        "<span class='jealous'>You're only jealous because you don't look like that.</span>",
        "<span class='dont-read-it'>If you don't like it, don't read it.</span>",
        "<span class='censorship'>That's censorship!</span>",
        "<span class='realism-in-media'>No one wants realism in media.</span>",
        "<span class='happens-in-real-life'>But rape happens in real life too!</span>",
        "<span class='punished-for-biology'>Men can't help themselves. Why are you punishing us for our biology?</span>",
        "<span class='oppression-olympics'>Why are you complaining about this when women in Muslim countries are oppressed?</span>",
        "<span class='just-not-good-enough'>There aren't many women in the field because they're just not good enough.</span>",
        "<span class='just-not-interested'>There aren't many women in the field because they're just not interested.</span>",
        "<span class='misogynist'>Are you calling me a misogynist?!</span>",
        "<span class='asked-my-girlfriend'>I asked my girlfriend, and she's not offended.</span>",
        "<span class='human-nature'>Human nature is never going to change. You're just wasting your time.</span>",
        "<span class='abortion-breast-cancer'>Abortion causes breast cancer, you know.</span>",
        "<span class='just-dont-have-sex'>If you don't want to get pregnant, just don't have sex.</span>",
        "<span class='children-are-womens-purpose'>Having children is a woman's purpose.</span>",
        "<span class='once-met-a-woman'>I once met a woman who regretted her abortion.</span>",
        "<span class='abortion-worse-than-rape'>Abortion is worse than rape.</span>",
        "<span class='love-it-if-a-babe'>I'd love it if a babe forced herself on me sexually.</span>",
        "<span class='hysterical'>You're just hysterical.</span>",
        "<span class='rape-culture'>All this talk about rape culture stops women from being responsible for themselves.</span>",
        "<span class='too-old-to-change'>I know, it's bad, but I'm too old to change.</span>",
        "<span class='gender-studies'>Why aren't there Men's Studies?</span>",
        "<span class='compliment'>You should take it as a compliment!</span>",
        "<span class='out-of-context'>It was out of context.</span>",
        "<span class='enjoy-being-offended'>You enjoy being offended.</span>",
        "<span class='if-you-were-offended'>I'm sorry if you were offended.</span>",
        "<span class='innocent-until-proven'>Whatever happened to innocent until proven guilty?</span>",
        "<span class='way-too-seriously'>You're just taking things way too seriously.</span>",
        "<span class='never-happened-to-me'>Well, that's never happened to me.</span>",
        "<span class='bigots-will-die'>Just wait, and all the bigots will just die off on their own.</span>",
        "<span class='sex-equals-gender'>Sex and gender are the same thing.</span>",
        "<span class='against-dissent'>You just don't like dissent.</span>",
        "<span class='why-people-hate-feminists'>People like you are why people hate feminists.</span>",
        "<span class='mean-anything'>He didn't mean anything by it.</span>",
        "<span class='real-issue'>Feminism is a distraction from the real issue here.</span>"
      ],
      
      generateSquares = function(data) {
        var x, y,
            card = $('.card'),
            randomSource = function() {
              var index = Math.floor(Math.random()*sourceArray.length),
                  result = sourceArray[index];
              sourceArray.remove(index);
              return result;
            },
      
            sectionTag = function(x, y, content) {
              return '<section class="square" class="' +
              x + '-' + y + '">' +
              content + '</section>';
            };
        
        eachGridElement(function(x, y) {
          if(x == 2 && y == 2) {
            card.append(sectionTag(x, y, "I would listen to you if you weren't so angry."));
            $('#2-2').addClass('free filled');
          } else {
            card.append(sectionTag(x, y, randomSource()));
          }
        });
      },
      
      eachGridElement = function(block) {
        for(x = 0; x < 5; x++) {
          for(y = 0; y < 5; y++) {
            block(x, y);
          }
        }
      },
      
      fillSquare = function(square) {
        square.addClass('filled');
        
        // someday when I care that much I should probably make a custom event to trigger this
        checkForWin();
      },
      
      checkForWin = function() {
        var grid = [[],[],[],[],[]],
            trueIfAllTrue = function(array) {
              for(var x = 0; x < array.length; x++) {
                if(!array[x]) {return false;}
              }
              return true;
            },
            winConditions = [
              function() {
                for(var x = 0; x < 5; x++) {
                  if(trueIfAllTrue(grid[x])) {
                    return true;
                  }
                }
                return false;
              },
              function() {
                var count;
                for(var y = 0; y < 5; y++) {
                  count = 0
                  for(var x = 0; x < 5; x++) {
                    if(grid[x][y]) {count++;}
                  }
                  if(count == 5) {return true;}
                }
                return false; 
              },
              function() {
                for(var i = 0; i < 5; i++) {
                  if(!grid[i][i]) {return false;}
                }
                return true;
              },
              function() {
                for(var i = 0; i < 5; i++) {
                  if(!grid[4 - i][i]) {return false;}
                }
                return true;
              }
            ];
        
        eachGridElement(function(x, y) {
          if($('#'+x+'-'+y).hasClass('filled')) {
            grid[x][y] = true;
          } else {
            grid[x][y] = false;
          }
        });
        
        for(i = winConditions.length - 1; i >= 0; i--) {
          if(winConditions[i]()) {
            win();
            break;
          }
        }
      },
      
      win = function() {
        alert("Congratulations! You have found a troll!");
		$('.win').addClass("won");
      };
            
  $(document).ready(function() {
    generateSquares();
    
    $('.square').click(function() {
      fillSquare($(this));
    });
  });
})(jQuery);