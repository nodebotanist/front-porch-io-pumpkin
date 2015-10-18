module.exports = {
  name: "pumpkin-thin-client",
  platform: "photon",
  dest: '',
  components: [
    {
      name: "neopixels",
      type: "neopixels",
      pins: {
        data: 'D3'
      },
      options: {
        length: 15,
        type: 'WS2812',
        customFunctions: ['pixels']
      }
    }
  ]
}