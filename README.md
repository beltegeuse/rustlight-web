<div align="center">
  <h1><code>WASM + Rustlight</code></h1>
</div>

In this repository, an experiment of compiling [Rustlight](https://github.com/beltegeuse/rustlight) with WASM and able to run it inside a web-browser.

## Usage

You can compile the rust-glue of Rustlight with
```
wasm-pack build
```

Then you can run npm to see the application:
```
cd www
npm run start
```

You can then edit the PBRT file in the textbox. In this version, only geometric/material/light information has an impact on the final image. After clicking the `Render!` button, the image will render with path tracing (NEE and Russian roulette) with one core.  

![screenshot](https://raw.githubusercontent.com/beltegeuse/rustlight-web/master/assets/screenshot.png)

You can stop the rendering with the `Stop!` button. 

## TODO

- Export wasm to a webpage (AWS)
- [Add multi-core support](https://github.com/rustwasm/wasm-bindgen/issues/2175)
- Improve interface and JS code
- Extend scene support (text