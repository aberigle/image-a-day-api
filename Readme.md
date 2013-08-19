# Image a day API

A quick thing to make getting an image of the day easier.

Currently using the Bing's image of the day, open to adding more and
allowing supplying of options to select from a specific source or
random. (like Nasa space image, etc)

Note: Please respect the copyright of the image being displayed.

## Usage

There is a hosted version of this project up at
[http://image-a-day.herokuapp.com](http://image-a-day.herokuapp.com) but 

### `GET /image`
Returns a JSON block like this:

```
{
  imageUrl: "http://bing.com/az/hprichbg/rb/HawaiiPineapple_EN-US11488677220_1366x768.jpg",
  copyright: "Pineapple fields in Maui, Hawaii (Â© Pacific Stock - Design Pics/SuperStock)",
  copyrightLink: "http://www.bing.com/search?q=Maui%2C+Hawaii&qs=n&form=hpcapt&filters=HpDate%3a%2220130816_0700%22",
  description: "Come harvest time, these fields will produce..."
}
```

## Why

I'm making an [inbox zero plugin for Gmail /
Chrome](https://github.com/kalv/gmail-zero-inbox) that will show this
photo of the day when I have no emails in my inbox - inspired by the
mailbox app on iOS.
