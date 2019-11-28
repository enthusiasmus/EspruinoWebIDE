/**
 Copyright 2014 Gordon Williams (gw@pur3.co.uk)

 This Source Code is subject to the terms of the Mozilla Public
 License, v2.0. If a copy of the MPL was not distributed with this
 file, You can obtain one at http://mozilla.org/MPL/2.0/.

 ------------------------------------------------------------------
  Blockly blocks for Espruino Graphics (global variable g)
 ------------------------------------------------------------------
**/

var GFX_COL = 20;


function gfxStatement(blk, comment) {
  blk.setPreviousStatement(true);
  blk.setNextStatement(true);
  blk.setColour(GFX_COL);
  blk.setInputsInline(true);
  blk.setTooltip(comment);
}
function gfxInput(blk, comment) {
  blk.setOutput(true, 'Number');
  blk.setColour(GFX_COL);
  blk.setInputsInline(true);
  blk.setTooltip(comment);
}
// ----------------------------------------------------------
Blockly.Blocks.gfx_clear = {
  category: 'Graphics',
  init: function() {
    this.appendDummyInput()
        .appendField('Clear Screen');
    gfxStatement(this, 'Clear the screen');
  }
};
Blockly.JavaScript.gfx_clear = function() {
  return `g.clear();\n`;
};
// ----------------------------------------------------------
Blockly.Blocks.gfx_setColor = {
  category: 'Graphics',
  init: function() {
    this.appendDummyInput()
        .appendField('Color')
        .appendField(new Blockly.FieldColour('#ff0000'), 'COL');
    gfxStatement(this, 'Set the color');
  }
};
Blockly.JavaScript.gfx_setColor = function() {
  var c = this.getFieldValue('COL');
  var r = parseInt(c.substr(1,2),16)/255,
      g = parseInt(c.substr(3,2),16)/255,
      b = parseInt(c.substr(5,2),16)/255;
  return `g.setColor(${r},${g},${b});\n`;
};
// ----------------------------------------------------------
Blockly.Blocks.gfx_setBgColor = {
  category: 'Graphics',
  init: function() {
    this.appendDummyInput()
        .appendField('Background Color')
        .appendField(new Blockly.FieldColour('#ff0000'), 'COL');
    gfxStatement(this, 'Set the background color');
  }
};
Blockly.JavaScript.gfx_setBgColor = function() {
  var c = this.getFieldValue('COL');
  var r = parseInt(c.substr(1,2),16)/255,
      g = parseInt(c.substr(3,2),16)/255,
      b = parseInt(c.substr(5,2),16)/255;
  return `g.setBgColor(${r},${g},${b});\n`;
};
// ----------------------------------------------------------
Blockly.Blocks.gfx_setFont = {
  category: 'Graphics',
  init: function() {
    this.appendDummyInput().appendField('Set Font ').appendField(new Blockly.FieldDropdown([
          ["6x8","6x8"],
          ["4x6","4x6"],
          ["Vector","Vector"]
        ]), 'STYLE');
    this.appendValueInput('SIZE')
        .setCheck(['Number'])
        .appendField('size');
    this.appendDummyInput().appendField('Aligned').appendField(new Blockly.FieldDropdown([
          ["Left","-1"],
          ["Center","0"],
          ["Right","1"],
        ]), 'X').appendField(new Blockly.FieldDropdown([
          ["Top","-1"],
          ["Middle","0"],
          ["Bottom","1"],
        ]), 'Y');
    gfxStatement(this, 'Set the font');
  }
};
Blockly.JavaScript.gfx_setFont = function() {
  var font = this.getFieldValue('STYLE');
  var size = Blockly.JavaScript.valueToCode(this, 'SIZE', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var x = this.getFieldValue('X');
  var y = this.getFieldValue('Y');
  return `g.setFont("${font}",${size});g.setFontAlign(${x},${y});\n`;
};
// ----------------------------------------------------------
Blockly.Blocks.gfx_drawString = {
  category: 'Graphics',
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck(['String','Number','Boolean'])
        .appendField('Draw Text')
    this.appendValueInput('X')
        .setCheck(['Number'])
        .appendField('at X');
    this.appendValueInput('Y')
        .setCheck(['Number'])
        .appendField('Y');
    gfxStatement(this, 'Draw some text');
  }
};
Blockly.JavaScript.gfx_drawString = function() {
  var text = Blockly.JavaScript.valueToCode(this, 'TEXT', Blockly.JavaScript.ORDER_ASSIGNMENT) || '""';
  var x = Blockly.JavaScript.valueToCode(this, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var y = Blockly.JavaScript.valueToCode(this, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  return `g.drawString(${text},${x},${y},true);\n`;
};
// ----------------------------------------------------------
Blockly.Blocks.gfx_moveTo = {
  category: 'Graphics',
  init: function() {
    this.appendValueInput('X')
        .setCheck(['Number'])
        .appendField('Move to X');
    this.appendValueInput('Y')
        .setCheck(['Number'])
        .appendField('Y');

    gfxStatement(this, 'Move the cursor to a location');
  }
};
Blockly.JavaScript.gfx_moveTo = function() {
  var x = Blockly.JavaScript.valueToCode(this, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var y = Blockly.JavaScript.valueToCode(this, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  return `g.moveTo(${x},${y});\n`;
};
Blockly.Blocks.gfx_lineTo = {
  category: 'Graphics',
  init: function() {
    this.appendValueInput('X')
        .setCheck(['Number'])
        .appendField('Line to X');
    this.appendValueInput('Y')
        .setCheck(['Number'])
        .appendField('Y');

    gfxStatement(this, 'Draw a line to location');
  }
};
Blockly.JavaScript.gfx_lineTo = function() {
  var x = Blockly.JavaScript.valueToCode(this, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var y = Blockly.JavaScript.valueToCode(this, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  return `g.lineTo(${x},${y});\n`;
};
// ----------------------------------------------------------
Blockly.Blocks.gfx_draw = {
  category: 'Graphics',
  init: function() {
    this.appendDummyInput().appendField('Draw ').appendField(new Blockly.FieldDropdown([
          ["Rectangle","drawRect"],
          ["Filled Rectangle","fillRect"],
          ["Cleared Rectangle","clearRect"],
          ["Ellipse","drawEllipse"],
          ["Filled Ellipse","fillEllipse"]
        ]), 'STYLE');
    this.appendValueInput('X')
        .setCheck(['Number'])
        .appendField('from X');
    this.appendValueInput('Y')
        .setCheck(['Number'])
        .appendField('Y');
    this.appendValueInput('X2')
        .setCheck(['Number'])
        .appendField('to X');
    this.appendValueInput('Y2')
        .setCheck(['Number'])
        .appendField('Y');
    gfxStatement(this, 'Draw a rectangle');
  }
};
Blockly.JavaScript.gfx_draw = function() {
  var cmd = this.getFieldValue('STYLE');
  var x = Blockly.JavaScript.valueToCode(this, 'X', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var y = Blockly.JavaScript.valueToCode(this, 'Y', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var x2 = Blockly.JavaScript.valueToCode(this, 'X2', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  var y2 = Blockly.JavaScript.valueToCode(this, 'Y2', Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
  return `g.${cmd}(${x},${y},${x2},${y2});\n`;
};
