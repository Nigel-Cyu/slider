(function () {
        var oDiv = $('.slider-list div');
        var flag = true;
        var timer = null;
        var index = 0;

        function init () {
            oDiv.css({'left': '1000px', 'height': '0'});
            oDiv.eq(0).css({'height':'240px', 'width':'400px', 'left':'0px', 'top':'30px', 'z-index':'1', 'opacity':'0.6'});
            oDiv.eq(1).css({'height':'300px', 'width':'500px', 'left':'250px', 'top':'0px', 'z-index':'100', 'opacity':'1'});
            oDiv.eq(2).css({'height':'240px', 'width':'400px', 'left':'600px', 'top':'30px', 'z-index':'1', 'opacity':'0.6'});
        }

        function nextMove () {
            if (flag) {
                flag = false;
                oDiv.css({'z-index': '1'});
                $('.slider-point li').eq((index + 1) % 8).addClass('active').siblings().removeClass('active');
                oDiv.eq(index % 8).animate({'height':'0', 'width':'300px', 'left':'-300px', 'top':'60px', 'opacity':'0'});
                oDiv.eq((index + 1) % 8).animate({'height':'240px', 'width':'400px', 'left':'0px', 'top':'30px', 'opacity':'0.6'});
                oDiv.eq((index + 2) % 8).animate({'height':'300px', 'width':'500px', 'left':'250px', 'top':'0px', 'opacity':'1', 'z-index':'100'});
                oDiv.eq((index + 3) % 8).css({'left':'1000px'});
                oDiv.eq((index + 3) % 8).animate({'height':'240px', 'width':'400px', 'left':'600px', 'top':'30px', 'opacity':'0.6'}, function () {
                    index++;
                    flag = true;
                });
            }
        }

        function prevMove () {
            if(flag) {
                flag = false;
                oDiv.css({'z-index': '1'});
                $('.slider-point li').eq((index - 1) % 8).addClass('active').siblings().removeClass('active');
                oDiv.eq(index % 8).animate({'height':'300px', 'width':'500px', 'left':'250px', 'top':'0px', 'opacity':'1', 'z-index':'100'});
                oDiv.eq((index + 1) % 8).animate({'height':'240px', 'width':'400px', 'left':'600px', 'top':'30px', 'opacity':'0.6'});
                oDiv.eq((index + 2) % 8).animate({'height':'0', 'width':'300px', 'left':'1000px', 'top':'60px', 'opacity':'0.6'});
                oDiv.eq((index - 1) % 8).css({'left':'-300px'});
                oDiv.eq((index - 1) % 8).animate({'height':'240px', 'width':'400px', 'left':'0px', 'top':'30px', 'opacity':'0.6'}, function () {
                    index--;
                    flag = true;
                });
            }
        }

        $('.slider-point li').on('click', function () {
            if (flag) {
                flag = false;
                var num = $(this).index();   //点击位置
                var mNum = null;   //点击位置和当前位置的差值
                $('.slider-point li').eq(num).addClass('active').siblings().removeClass('active');
                if ((index % 8) < 0) {
                    if (((index % 8) + 8) < num) {
                       mNum = num - ((index % 8) + 8);
                       for (var i = 0;i < mNum;i++) {
                            flag = true;
                            $('.next').trigger('click');
                            index++;
                       }
                    }else {
                       mNum = ((index % 8) + 8) - num;
                       for (var i = 0;i < mNum;i++) {
                            flag = true;
                            $('.prev').trigger('click');
                            index--;
                       }
                    }
                }else {
                    if ((index % 8) < num) {
                       mNum = num - (index % 8);
                       for (var i = 0;i < mNum;i++) {
                            flag = true;
                            $('.next').trigger('click');
                            index++;
                       }
                    }else {
                        mNum = (index % 8) - num;
                        for (var i = 0;i < mNum;i++) {
                            flag = true;
                            $('.prev').trigger('click');
                            index--;
                       }
                    }
                }
            }
        })
        $('.next').click(nextMove);
        $('.prev').click(prevMove);
        init();
        timer = setInterval(nextMove, 2000);
        $('.wrapper').mouseenter(function(event) {
            clearInterval(timer);
        });
        $('.wrapper').mouseleave(function(event) {
            clearInterval(timer);
            timer = setInterval(nextMove, 2000);
        });
})()