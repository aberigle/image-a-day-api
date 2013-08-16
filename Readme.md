# Image a day API

A quick thing to make getting an image of the day

Note: Please respect the copyright of the image being displayed.

Currently using the Bing's image of the day

## Usage

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

I'm making an inbox zero plugin for Gmail / Chrome that will show this photo of the day when I have no emails in my inbox.