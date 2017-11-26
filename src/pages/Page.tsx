
import React, { Component } from 'react';
import { autobind } from 'core-decorators';

import WebGLCanvas from 'webgl-canvas';
import WebGLText from 'webgl-fancy-text';
import provideDimensions from 'provide-dimensions';

type Dimensions = {
    width: number;
    height: number;
};

type AppProps = {
    children?: undefined;
    dimensions: Dimensions;
};

type AppState = {
    mouse: {
        x: number;
        y: number;
    };
};

@provideDimensions
@autobind
export default class Page extends Component<AppProps, AppState> {

    public props: AppProps;

    private text: WebGLText;

    public state: AppState = {
        mouse: { x: 0, y: 0 }
    };

    private onSceneInitialized(gl: WebGLRenderingContext) {
        this.text = new WebGLText(gl);
        this.text.setText({
            text: 'Caldera',
            fontFamily: 'Quicksand, sans-serif',
            fontSize: 100,
            textAlign: 'center'
        });
    }

    private onSceneRender(gl: WebGLRenderingContext) {
        const { dimensions } = this.props;
        const { mouse } = this.state;
        this.text.render({
            mouse,
            rotation: 0,
            position: { x: dimensions.width / 2, y: dimensions.height / 2 - 50 },
            center: { x: 0, y: 0 },
            resolution: dimensions,
            size: { width: 300, height: 100 }
        });
    }

    public render() {
        const { width, height } = this.props.dimensions;
        return (
            <WebGLCanvas dimensions={{ width, height }}
                         onSceneInitialized={this.onSceneInitialized}
                         onSceneRender={this.onSceneRender}
                         onMouseMove={e => {
                             this.setState({
                                 mouse: {
                                     x: e.nativeEvent.offsetX,
                                     y: e.nativeEvent.offsetY
                                 }
                             });
                         }}/>
        );
    }
}
