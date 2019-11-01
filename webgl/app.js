var vertexShaderText = 
[
    'precision mediump float;',
    '',
    'attribute vec2 vertPosition;',
    'attribute vec3 vertColor;',
    'varying vec3 fragColor;',
    '',
    'void main()',
    '{',
    'fragColor = vertColor;',
    'gl_Position = vec4(vertPosition, 0.0, 1.0);',
    '}'
].join('\n');

var fragmentShaderText = 
[
    'precision mediump float;',
    '',
    'varying vec3 fragColor;',
    'void main()',
    '{',
    'gl_FragColor = vec4(fragColor, 1.0);',
    '}'
].join('\n');


var InitDemo = function () {
    console.log('This is working');
    
    var canvas = document.getElementById('game-surface');
    var gl = canvas.getContext('webgl');
    
    if(!gl) {
        console.log('Taking experimental context');
        gl = canvas.getContext('experimental-webgl');        
    }
    else
    {
        console.log('Using webgl context');        
    }
    
    if(!gl)
    {
        alert('Your browser does not support webGL');
    }
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0,0,window.innerWidth, window.innerHeight);
    
    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    //
    // Create shaders
    //
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error("Error compilng vertex shader! ");
        return;
    }
        
    
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error("Error compilng fragment shader! ");
        return;
    }
    
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Error linking program! ");
        return;
    }

    // gl.validateProgram(program);

    //
    // Create buffer
    //
    
    var triangleVertices =
    [ //X    Y,      R  G  B
        0.0, 0.5,    1.0, 1.0, 0.0,
        -0.5, -0.5,  0.7, 0.0, 1.0,
        0.5, -0.5,   0.1, 1.0, 0.6 
     ];
    //
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);
    
    var positionAttrebuteLocation = gl.getAttribLocation(program, 'vertPosition');
    var colorAttrebuteLocation = gl.getAttribLocation(program, 'vertColor');
    gl.vertexAttribPointer(
        positionAttrebuteLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );

    gl.vertexAttribPointer(
        colorAttrebuteLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    
    gl.enableVertexAttribArray(positionAttrebuteLocation);
    gl.enableVertexAttribArray(colorAttrebuteLocation);
    
    //
    // Main render loop
    
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    //
};


// function vertexShader(vertPosition, vertColor) {
//     return {
//         fragColor: vertColor,
//         gl_Position: [vertPosition.x, vertPosition.y, 0.0, 1.0]
//     }
// };