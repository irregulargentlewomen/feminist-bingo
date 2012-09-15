(function ($) {
    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function (from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

        // We're going to be doing this in a mostly functional style as opposed to an
        // object-oriented one. Once the squares are assembled, the only relevant data about
        // them is whether they're clicked or not (which is best handled by a simple true/false
        // array) and which retort in the retorts list they correspond to (which is best handled
        // by carrying it in data-* DOM attributes). Building a bunch of Square objects might
        // make the code mildly neater, by some lights, but that small elegance gain is IMO
        // more than offset by the performance hit of maintaining all of that information in
        // memory needlessly.
        
        // (tl;dr: your author was playing with knockout.js all weekend, loved it, and feels weird
        // about loving it because her first Javascript mentor was sufficiently performance-obsessed
        // that he hated JQuery.)
        
        // of course, one of the disadvantages of structuring things this way is that it's a bit
        // harder to make the control flow self-documenting. ^^;; So - clicking on a square triggers
        // fillSquare; fillSquare fires checkForWin; checkForWin sometimes fires "win."
        
    var grid = [[],[],[],[],[]],
        winList,

        generateSquares = function (data) {
            var x, y,
                card = $('.card'),
                used_indices = [],
                sources = winList.find('li'),
                
                randomSource = function () {
                    var index = Math.floor(Math.random() * sources.length);
                    return $(sources[index]);
                },

                sectionTag = function (x, y, slug, content) {
                    return '<section class="square" id="' + x + '-' + y + '" data-slug="' + slug + '"><span>' + content + '</span></section>';
                };

            eachGridElement(function (x, y) {
                var source;
                if (x === 2 && y === 2) {
                    card.append(sectionTag(x, y, "free-space", "I would listen to you if you weren't so angry."));
                    $('#2-2').addClass('free filled');
                    grid[2][2] = true;
                }
                else {
                    source = randomSource();
                    card.append(sectionTag(x, y, source.attr('data-slug'), source.find('.comment').html()));
                    grid[x][y] = false;
                }
            });
        },

        // maps the given function over a 5x5 set of indices
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
            var coords = square.attr('id').split('-');
            square.addClass('filled');
            winList.find('[data-slug="'+square.attr('data-slug')+'"]').addClass("troll");
            grid[coords[0]][coords[1]] = true;

            checkForWin();
        },

        // right now we're checking for win by having a list of "win conditions" and evaluating
        // each in turn. A win condition is a function which traverses the grid and returns true
        // iff it finds that (at least one of) the lines (or other shapes) that it's checking
        // for is entirely composed of true squares. If/as soon as any of the win conditions
        // returns true, "win" is triggered.
        
        // This algorithm subject to revision if/when I think of a better approach - I like the
        // flexibility this gives but I hatehatehate the fact that it requires all squares to be
        // read multiple times. (note to self for future: try something with Array#push &
        // length-checking? or just incrementing a set of counters?)

        checkForWin = function () {
            var trueIfAllTrue = function (array) {
                    for (var x = 0; x < array.length; x++) {
                        if (!array[x]) {
                            return false;
                        }
                    }
                    return true;
                },
                winConditions = [
                // horizontal line
                function () {
                    for (var x = 0; x < 5; x++) {
                        if (trueIfAllTrue(grid[x])) {
                            return true;
                        }
                    }
                    return false;
                },
                // vertical line
                function () {
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
                },
                // diagonals, part one (\)
                function () {
                    for (var i = 0; i < 5; i++) {
                        if (!grid[i][i]) {
                            return false;
                        }
                    }
                    return true;
                },
                // diagonals, part two (\)
                function () {
                    for (var i = 0; i < 5; i++) {
                        if (!grid[4 - i][i]) {
                            return false;
                        }
                    }
                    return true;
                }];

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
        winList = $('.win ul');
        generateSquares();

        $('.square').click(function () {
            fillSquare($(this));
        });

        getKittenVideo();
    });
})(jQuery);