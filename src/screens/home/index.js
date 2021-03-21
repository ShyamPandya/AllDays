import React from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Post from '../../components/Post';

const posts = [
  {
    id: 'p1',
    user: {
      id: 'u1',
      userName: 'Shyam_Pandya',
      imageUri:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUSExIVFhUVFhUWFRUVFRUVFRYVFRUWFxUXFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHiUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAgMFBgcBAAj/xABBEAABAwIDBQUFBgQEBwEAAAABAAIRAyEEEjEFBkFRYRMicYGRMqGxwfAHFEJi0eFScoKiIzOS8RU0Q3OywtJT/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QAKBEAAgICAgMAAQMFAQAAAAAAAAECEQMhEjEEIkEyE1FxQlJhkdEU/9oADAMBAAIRAxEAPwDTwbp5j0KDdONciyQ1tGvAWOfaNVly1PaNSZWS79Ol6nldRFbKnQcJUpRaCFD1LFGYWsVgnG1YrQ5i2qPeCpOrdA1wux2jkwNwXabV1660rQuh0xQYvOan8Nh31HBrGlzjoACSfAC58lOt3ae0f4pDecNfUjpLIb/d5DjRWOVV7V1itWH2RhCYdWeDp3mQJ6QT81IHc+mdHOIOhaG+oEX8PgqKLObKcyTYXKTUZBhaLsHccCo1znlwuRYCAGuMi5va3goV+69RhOai914OT2QLScxabDw49EjgwFPeV1jipzam7z6d8rgzQO9oE9TYtPQj1UW7CluvkeB8EtUCxdN4XnOQ9QwuNqJZICQZQbdGPp8VG066f+8yldnNOz1TVJqFcL5XHMKomFDbmSvNwcldplH4UISdDSnSPYbCwiatMQmn1sqGOLQTbIU2LgLyY7bovJrY3Fn0cDdcfUgJGa6RWNloGI3HVNVkm9+I/wAQrUdo1LFYzvZWmqVPKrjQtWRb3SURhzCEolFUlBrRzC31LIGvVTjnIc0y4wljFI5I9h6Tqjg1olxMAKw0sLhMJH3l/aVRrSZLsp5Oi09CfXgHisT9yZlZ/wAxUESYmk3oB/1DzPsjTW0NgGF5hzQ7nbL4w7mrQiXjDVsumH3tomzA+kDxFIZf6sj5PnKkaFOo5oqyKjHaVKTjryyzr0MKtYejTaQHXa6xcR3hbuud+YGAecg807hNqOwdRxaM1M2q0zcEcxz+IVHIdQJrHUKZA7QS1xytqtBDmu8dZ/Kdeuise6bwGBjyDDmtzT7QP+W4Eacp6dIFCxm8Jk5WyxwiHTDm65X9RqHag35obC7RqNa5jScrvZ5ggyAeokjw8EnJjuHw2fbO0DhaZqNaHxrFiWvBGYjnYhVurvT2x7thacoFvAyqxitvYisxgMkix5EEgn+4T5lR1FjaJ7+dxJAaxkwPGxM9AqRn+5N42X6lgy8FzXFwNnCAZjodecWPRDYjdqjXYWluQ3IcywDvDTxBA4aWXt3MQWkENqNBiQ648wRI8QSeiuTsLn77NdSBo4Xjz5Hy5rnJMHEw7eHYFXCuAqCWunK8ey6OHR3QqMp01vNfZjKzHUngOpvHeYfwngW8RB82npYZFvPsN2EqmmSXN9pjiIzMmJ8QbHy4EKLWyclRBuYmjITr6ibe5MFMXh3o0kKINSEbhmlyWUUc4jsIukJCaGEcEtgIU3taJyO16ZIQ3ZQpBhXHtC6LAnRHwF5E5WryoNZ9AQhqz0TWdCEcJBWkDIbaj+6T0WJbxumsfFbLtt0Mcsd2kzNVd4qeR0gxBsLSKPNEpzBU4Rj2iFjlk2Tk9kTUZCO2fTFNjsQ8SGENptOjqrtPJolx8BzQ+JhEbRJ7Km3RrQHRydWEz1IYmhsthVsiqlI1Xl7ngT1v4AxZFUcGGkAF2bhDpvw4D4IKpjAyQwdJOvlyVy3D2GX5Xv4mY0t4eS0o08bYzhN269USBHw/2U1S3Ie4d+Cfl9QtJweBYxoEBFdm1NLGUg0Z/gfs9px3z5AA+9TFDczDgRlM81bGsC8ApcSyohaO7dFoszwUZtfdlj9O7aJFv91cYTVWiIkoSWtAVXsxLbGxsThX9ox7iRpD3AQOF7eSvX2cb0/ewaNQCnXbpc5XHkRwJ4jjEjpN7V2eHtLXDVZmcA/B4tr2uIh1nTw1EzqLe7olg29MTLFVaNhxNHN3miH8RzjUePxEEaKP2/sFmNoZHe2Lsdb2o0nk4WPjPBSmExjajQ4xdoLvykcQf7vCeSLDOPHQjn1TWZqPl7HYV9Oo+m4HMxzmkcZBhDStR+2Pd3K9mOpju1DkrEatqj2XGNA4TPUDms3dSvJ14+KKEegIi6ntktaoisyF3D4ghCUbQktrRbKxACiK5ug6uOJCYZiCSljionGDDwXBeFY8URhxITdVoTVQyYiVxckLy4Y3+s5cw51SKhXqAsVqRORXd57NcskxXtkrU97KkNKyvEXcVDyHVAQ5h6iefVkICmYKfz2WRxFaE5ZXNvVLuvqQPQBnwC7KRt3LMudqA5oAnW9zoNeqpj7NWB9kVgqRe8CJ4R1K3PYtEUWtEcPkss3XwcPBMcOcieC1ugzMAOgWqqLwdskmYtx8EQ2pdKw+Dtf696cOHiUsk/ppi4/B+i+yclMU9E8xqBwTTNkp7UlgHNOEICsjMcREfBVbbuCa+5APSYnnB4Hl1Ct2NwhIMa9FUcRie8Wm44/xDrH+3BcJLob2Njn0wA78Jyh/4XN/A6eBBzNI1CtWC2nJgxezOWZvtUzy5jo78qqVTAGoHGnAqCTlAAFQR3mnqQJHGWixULhNr5BlqOOVxyOJlpY9t6VSD7LhMGf4SOJUpppk1s1fHYKniKD6bxNOqIPMHgRPEGD9FfP+8uw34PEGg4yLGm/g5h9kyePDpZbFuvt0uGV8Zphw/OOX8wv49TCZ333aGJp5G/5kl+HdyqAZ3UXdHgOg84QjIScDBargmmUkViaAa5zSCIsAdZ5EdDPouUgrp2TqhlzE2yneUTUXKaAtBWEeUutdcY2E5AhBsR6YJlXEV2PVcQtB5G8ArraoAKSxqbr0lqQjKhvfU7pWZ1alytF3xs0rMqrrqGZWzkhTk7TKHpCSjmU7KDQGMVLJOL7wpT+b0BEfNLrBepU82UcQfcf3XQeyuF7JTdl4diWUwCST6Aa20haxW2hSw7Zee9Fm2krIt2nmnic8nuMcQL3JFjaysrMM1/fxL2tBvewE9Vqc6VmrHBydIt2C30pvNvTj+6ncHtVtQi+p0WSYqrgRehVfMxmFN2SeWaLqR3XxdZ2KpU9QTM3FgCZKhKcrNkMcEuy+YraLmtyt1Ej00Ve2ltvEsILXCfX3FWjePZfczMMPKz7ENq05zMJqSYBvMfwAa6i+l1OU5XRSMINWT+zd7MR/1Kbj1A+QVl2dvSx1nGOmh+vRZ4/eDHYYjNRpvBaHAZXOdJJgSw625Kfw23hWaDisJUoEx33CafmdW+apcoq2QqMnUTSGPbUbLSqpvZsUVAf4osRrPC6L2NU7M2ktPLQjmpraVHM3ylF+yFXpLZk+72NeA+Cc1J15uYJsWnyNtDHMqI3uxYqVGloyl8hwHF4j3W+CnKz20sQ4xAdLX9ASJPpJ8lCbR2W6oezY3PWBILZFpkZjP4SCe+OB0KC2iUl7aA92Nvmm8ZnHI7ukyZ7pljvED5radm4kV6Ya7jAzDg9sOpvEdR8OawTH7DxGDf2dYNIfJa5jpbmGo6O0PktF+zTbGen2bpzU+6eZZNj5aKE/V2isoaIP7VtjhlduJaABXLu0A0biKZy1fJ0Zh1D1SGFat9pTJpEHR5Lj0rU8rQ7oC0Ot+YlZPTBVscrVmOaoVUamqZhF5E1Upqlk1Icp1F11YIRzkPVqo0BqyU7cLyiO2XkvE6j6YpEJnFPhN03wm8W6VqJlF35rd0rMHvWhb9vtCztwUMi2Mh+hUhHsqWUOCjaBJU5IEkFyuNkEEcL/ALLzV0lQcaYqdExuxQnGFsfge7wEAfMKzDdoVXCviHw2TkpaDKNCb3n9FF/ZywOxTnkXFEtHHV7CPcCtGbgCSXSL3vc/XRa17RTPRwytFRbsLCMjIXFwILROYAiCIbAHAenFTm62AbTqEtbBAJvqC4ibcPBSbcM1t4HjEBH7MoNAlpBLrk/XBGn2yqUVqKCcZSzDy0UNtPBvNxpEEwCQrK+nItB5wUHVeGnKZE89FJqmVTsr+FpObwb4yR7oUpSAIg5COVyPdp6Ix1IHl4p+lhxC6jtAmFwDWnutA5CB7iArDSohzBI4XUZlvopQVsrJP11TxSRDK2ZFvZgHdu4tEnN3RwN7g+Wb0Unu7swF0ud3gwtHB4abREzqNRyVjq4Zr8Q1xF2gyOsHLb+p3ohtq7MDavbtABgX0Inh1vJ81LJa6HwpSezPN89gMw1Oo5lgK1OG3sX5518Peh9yXGligSe64Hjwg6+5XD7S6GbC6Xc7Dk+Le1cf7QFEbv4Ps2DtB3gDeOEgQs2SkqLZJW9k9vfs37zQezNBcO6SJGdnXgSLdZWPvolhyuiRaQZHrxC0TfzaZZh6bhPedAIMGYBmf6dORngs8xNUPOf8Tru5TeT00mOqvhXoebl7EPdCYqVV2sUK9hKulSJqIl9SU0WIqlhHHgnHYcjULrC9AHZryO7JeQEs+gGJuubLjjCarPstItGdb9uvCoxarnvo6XqpELNkfsAbZQlEMpEJ3DiUSW2UZTaFbBXPTBqow0UJVoIKSYVRZ/szxUYpzToaTvc5i1Y4sRCxbdJxZiWEcQ8f2E/JaJTxhIHX6srqdRPS8SCkgzbOOfkd2d3QY4+5VvY28T2xTfLQTEmQJ89PNT9WsKbZNz9aqPdke/MQ2dbwRAFz81zhcbbNKzKMqSDcNW2iZNGph2C85u0qu6BsZQpzCNxNZoFcMGXi0+0eg4DzVd2Riql4J17ouBpe3mFYXbYyCXCIGnxMpFAZ5P2QXhsQ9nddwUg3GRooqltBlUAggzw4+5dfpa7ToeR5FBtxAqkTeFxAdYqTdRlpA+h9WVOwdQz6g+IMK4bOxElo5jn0lNCXIhnjXRAVabmy46wSfGR6fsicFTpvg1CZtYgCHaAnndJ34wT/ALtXNMw51OGkWIJeCb+HwVM3e23iKnZ03xJuSNYDstvehLUhcclwC96nurVhTpnMGio0uFwari1k+DYy+qY3kZkoCRGjDHA5ZYR4ODVKbM2dlrxbIXVHt5RVfnB/uCqX2m7RLKz6I0kCPBrXB3kXe7ooceUxMk3xI7eHbDa1ENbYznvH4tRax/Cqm8J01ba/X1CGqVFpj6qkY7bdsSWynKGHkrzDZOsqQuk9HORZtmbNGWYTG2sAA2YStm7UgJO1Noh4hdF6JOytdguoiQurrDbNjrlB4ipAKNxIUTj3d0rSinwoG9j5eqzUUzvDUl6icsrNkfsTEUqhGiLp1uaGbSPBOhhhTaTAwwVAUyagQdSQkU6sEEib3FxPSyCgkdGJad08IX1e00awOk83FpAaOt5VtwtPjyJjqYn5qt7HqvLO2qgMps/y2NBA1EHmfiSrRgKwInnCokel42otFY2rtipLnZHZByaTAGhICE2ZtN9XUPY20O7Gq4ax+AK40afdJbqCbEWgcF2jtpjTFQQZgW09FSk/yZqw+vWgGgc4IGJrFwmMmGqiTHEub803hxtIm1IlhHtVXMY7rLW5hCsVLbFJzu6xx0vGk6BTWGOcXBA9J8kkuJbk1u7/ANf8KUdlYqiBULmCblrM1vM2Oqu+zmzTGb8QB8/BJxdEVBk4HpYdfgne0y26Kb0QbtjWHpxfqSpXC4oZm6WIjoYUUatvim6Ve8pYugyV9lt3geDhnHXT4rM932Np1O0mQ1rS08xmD5jzKvbqhfh39Bb0WT7n1DVw1INM5LHmDlIIPS58IHNUm7pmWKqLRqlHKA11u6Aw8YLHFuv8pYsn+1OnnxArNvIM9AXGx8DI9Fcdj7QysdSqOmYB5tImJ6wR6Khb1vIqGDoSOYjjBnwtwulhXZHLpbK01tk42gncoS86azK5AtSlCbAKJquXaFOdUthvQnC0zMot9MkJyg0NXa9cAWTRkgaYD2K8u9uupw0bNXUPtIw0qUquULtl/dKsmVa0Zttxs1CgRTRe1asvKHmyzzM7uxVMQiALIVtRJdiCs+7FoVVYmGd1wdDXRwcJHmOK4+sUgFU2USYdVxdbEODC8C/RjQLTyDRzKtOy39k0UxUDxFnD2ZnQdFR3BSuDxgydmbGZB0HmdU8WaMU+MrNIwLS5rXCb5pHHWCSOAn5ov/goeJeBGnCf3URuXji9jmOILm3ltwRpfwMdLqfGLIe48ACBpBdLRY68esR4To4LjZeGX3oN2XsenSgD38OClxQAbM29ygxjrwIsYni46W6XKkcFi8zS4ARe3QEx5XUlEvOdbH20AAfDW8WOnx96jcQ+Drb0RVasG5mji4Tcz5Hyi481WsXi3F2UHxPhyUsujsLuyRq4kBp9ENhS57tDdJw1PNHE/UqewlANE8fipRVlmTGApxh3j8p+H7r593Pxr6NWo1hkCpkLeBBeWg+uVbNvTvQzBYUgEOr1ZFJk8eL3D+Fsz6DUrFa5GDy1wM8mHiYJMg5vVbf0ZSxuSXRglkUZ0y8fexVdnbLSdWmx8I0+VuCrW8rx2pGUh3E81oG6ApYvCPqBgDgQcsy5oMkQeWqz/eR4fXcfxAkOtAt7JHkYj8qz8JR/IlmyJqkRDhZMPejHUk1UoSuTMyBhKkMM2yEFOERTqALmGSsJraIGqvVsSmTWlNGNASY5kC8mu2Xk1BpmzVXKC23U7pUxVUBt09wq6LvozfH1O+UMKhSsd7ZQxeVCrZFoINYpymwlBMddS+EZN1OSpAegerShIyo3G6ICm66RW0cnocLUglFFtkNUangFMmN08W5lRwbrlzDkcpgg+TlZMXvK0tykOGXLMRaCNPeqju8cuIpnmS3/AFAge+Fb8dsWnVbezpsdOGiupNLRswqMlsHob2MYRDCBmk8ZEm2vvU8N6qYaY0yuIzEAzo0czE38VVW7nuJsSpTB7ktsaj3Hm0WH6qD8ijd/5U+w7G75NdMEZjyBIIiCINyeuiawWJfVMhpvzUxht3qDB3abQefH1N0fhMMG6BQlNzZaGOMFoJ2bh8oBN3cT+iY3l3lpYKnnd3qjpFKkD3nHiTyaOJ8rkwht5N4qWCpZj3nukU6UwXEcTyaOJWSYvGVK9R1as7M92p4ADRrRwaOA/Urb42Dlt9GPyc6hpdhlfaFStVNes7M93HQADRrRwaOXjxUdtPEmo4M4TPouvfCa2ezM8v8AIeAXqPSUUeV2+TNB3M2i7Dw5ukZXDgQdQfrkorbrB273RZxzN6gpOGrZWpztRVHZvtqWu4tMa9RpI/RT8jB+orXZK2RzzZB1qvJE4mm5hymDIlrm3BB49PAoX7vK8tpx0xkIaV17JFk7TpRqlsASXsqgNuHKWKEIkDimq9ZNyY1jXZheTOYribZ1Gy1Cq5vE7uFTz3Kt7yO7pWldDPoz7ENlxSBh09V1T1BwWSTfwi2COwqIpVctkTXdAUZiH3SJ32KnyO4uvKRhzKGeURhAnWkP8JRuiGqp4AqI2hiZ7o0+KbFByd/ARQqnjorUyNG1GHxhwN1qmLMEELF3FbNhz2tFp5taR6A+YVps3+Ou0Sux8e11jFvJHF4Jsqjh8K7NmAPlp6yrLs2SLgCOv6LBJbPVS0H5psoreHeGng6RJu82YwauPnoBaSht4N4mYVpMlzz7DOLvG1m8yffoswxOJqV6hq1TmcfIAcGtHADktXj+M5u30Y/J8hY/Vdi8Zi6mIqGtVdme70aODWjgAuTC60Jqq5eskorR5Dbk7YxianAcVKbPbAUThmZnZuWiksPUhw6/JLF7sEuiTY9JqVIkjkfIwUzSf3iOaZrVLkcwY9FaydBFXE+wM0QDyI4JZxf8TfNvzafkSojFvuz+r/1/Qp6jWtBUZQhN00N0iQdWadDPx8wbpouEKPc8tPAjqJCMpZaggHK7kSYPnqPOVkn4n9rGToaqVYTLnJGLoPabg/XhZMtJKzuDi6aKqnsfldTeReXDaNcrVLKt7eqd1StWuq7vBX7q1SXqyTfwruJaExTC62pKVTIWBWhBx7rIIsko4uEJtjULAnQBVpQncGwzZFuok8Eh0MBA1Op5DkFbDjeR18+hsbx1eBlB8ev7KDquujcS/wDZB9nxK1Spaj0ViqQ7szBGrUDdGi73fwsHtFazu2+WNYQAQAIN+FhKq252ywaWeIzulx5tBLQ3XjJOg0KsmzZa/MOZHks0nbNvjr6TNBppEtItqPNVLeHfx9JzqVCm05ZaXuzESLOhoIsNJPor/WpB7A7iFj+8WF7LE1QZHfLm24POcGPOPJdhxqTdlfIyyjFcSDxePrPealRxLnXObiOEDl4I/AYkPEaOHD5joo7EEkkmSTqTcnxQ4cWkEWI0WqE3B/4POkuRZXFBYo28bJ/C4gVGyNRYjkUzUbLwOVz8lqk7VokhVJmUJ/Np9XSVyEvQQmnUgzxSXOPIakjwTTX/AFCAq4N7j3nFw+uC5yaWkCkEYjENMNBkg8DIi4+a61yYp0A1PBBN/QuhZfK6x0JteTWAkKWMOhuNCDcEciOKU6jTfcdw+bm/qPf4KOa5PsqpnUlUharoM/4cf/0pf6z/APC8me16rqT9DH+x1yLq5yre8j7KxuVW3hdJUpqoBvZB0iu1KkLwMBMlslY3Rw72iKoVITNKhZM4rEZWkjwHifolLHHzs6r0Kx22oltMdC4++B80LhqznAucbfNA06JKOpFo7hPn14rVjTSr4U4pdHi2SlVWABP2CFqgzJVKo6y27mPc6mGAQGF2Y8XOOnkGn+4q8bMwXPgFQfs8x2SuaJ0qju/ztv7xPotOw8hZJqpHo+PThoIwbpBFrKl/aPs5rqba4AzMcGudFyxxgA+Do9SrdRqQTrcKufaFXDMG8E3e6m1onUhwcfQNKOLsOePqzKMY5MsppUFxT4ZC0JW7POehmhVNN0jzHMKSwpLpcRE6DpwQOSTClmMgQqQTFZ0hIKWV5rlQA2V1KcRy9/0fekkhoJOguuAJxFUNF7k6c021DMlzsx8uiJCRSvYao6UkrqSSiceDkppTa8XQJ+ui5MARmPNeQku/iXl3JnUaU90BVXbBlysuKdZVPHv75U/I/ChECtopTcIlU6oGqJFURZeXcujrYJXdlaQo2uAYnhw4I7H1LR1uo57l6UIcI0PFHaYvPIIOsjmiGzz+SBrrp9FI9j2DxPB3kf1RZEqNotSmVXN005HRGMqWzmr6D2AtIeww5pDmnqDIWzbtbTbXoMeNXC45EWI9ZWLUcU11jY8jp5FXHcHavZ1TQJ7tS7f5gLjzF/IoZEmuSLePPjLi/ppdZgHeJAABJnQBYtvjt04uuSD/AIbJbTHTi7+oifCFavtK3lt9zpm5jtnchqGeJ1PSBxKz2jT4+inCI+fJ/SLo04XXlLKbWhIyD+DpyZ5I+ExhGQ3xTyolSFOOXISimw7gicKaOvwUfiKud0D2R7zzT2Ord2Bq74JnD01Kbt0Ml9HWthKXVxFAPFIKW5NlcceSHm/hf9EtNDU/WiVhFyuLi6us6jQcZoqnjfaK8vLvI/EkgR6co8F1eWCP5IKBsZoPFCleXl6E+ykeh2t7LfBAVNQvLynMaIqmuPXl5d8OGXKc2P8A5lD+dvxXl5LHp/wMvyj/ACI2/wD81iP+7U/8ymWry8ngCfZx64F5eVBCSp6DySyuLyoKcemuK8vIMIJjvaHgnaS8vKP9TG+CykleXk4px6SV5eQYUcTTNF5eSsJ5eXl5A4//2Q==',
    },
    description: 'Awesome video buddy',
    likes: 100,
    comments: 23,
    shares: 34,
    videoUri:
      'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4',
  },
  {
    id: 'p2',
    user: {
      id: 'u2',
      userName: 'Ira_Kaundal',
      imageUri:
        'data:image/jpeg;base64,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',
    },
    description: 'Lovely',
    likes: 23,
    comments: 43,
    shares: 62,
    videoUri:
      'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
  },
];
const Home = () => {
  /*console.log(posts);*/
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({item}) => <Post post={item} />}
        showsVerticalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').height - 20}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
      />
    </View>
  );
};

export default Home;
