enum NeoPixelColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}

enum NeoPixelMode {
    //% block="RGB (GRB format)"
    RGB = 1,
    //% block="RGB+W"
    RGBW = 2,
    //% block="RGB (RGB format)"
    RGB_RGB = 3
}

//% weight=5 color=#0fbc11 icon="\uf112" block="Panel"
namespace Panel {


    
    let initialized = false

    let prev_x = 0
    let prev_y = 0

    let rotation_x = 0
    let rotation_y = 0
    let distanceData = 0

    let aCount  = 0
    let bCount  = 0
    let abCount = 0
    let p0Count = 0
    let p1Count = 0
    let p2Count = 0

    radio.onReceivedString(
        function (receivedString) {
            if ("a".compare(receivedString.charAt(0)) == 0) {
                aCount += 1
            } else if ("b".compare(receivedString.charAt(0)) == 0) {
                bCount += 1
            } else if ("ab".compare(receivedString.substr(0, 2)) == 0) {
                abCount += 1
            } else if ("p0".compare(receivedString.substr(0, 2)) == 0) {
                p0Count += 1
            } else if ("p1".compare(receivedString.substr(0, 2)) == 0) {
                p1Count += 1
            } else if ("p2".compare(receivedString.substr(0, 2)) == 0) {
                p2Count += 1
            } else if ("x".compare(receivedString.charAt(0)) == 0) {
                distanceData = parseFloat(receivedString.substr(1, receivedString.length-1))
            }
        }
    )

    //% subcategory="Move"
    //% blockId=IdStrip block="WalkFwd (2sec) cycle:1<=>10[cycle] %cycle"
    //% cycle.min=1 cycle.max=10 cycle.defl=1
    export function fwds(cycle: number): void {
        radio.sendString("M" + "1" + cycle)
        basic.pause(2500 * cycle)
    }

    buf: Buffer;
    pin: DigitalPin;
    // TODO: encode as bytes instead of 32bit
    brightness: number;
    start: number; // start offset in LED strip
    _length: number; // number of LEDs
    _mode: NeoPixelMode;
    _matrixWidth: number; // number of leds in a matrix - if any

    /**
     * Shows all LEDs to a given color (range 0-255 for r, g, b).
     * @param rgb RGB color of the LED
     */
    //% subcategory="LED"
    //% blockId=neopixel_set_strip_color block="%strip|show color %rgb=neopixel_colors"
    //% strip.defl=strip
    //% weight=85 blockGap=8
    //% parts="neopixel"
    showColor(rgb: number) {
        rgb = rgb >> 0;
        this.setAllRGB(rgb);
        this.show();
    }

    

}
