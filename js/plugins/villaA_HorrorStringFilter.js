//=============================================================================
// villaA_HorrorStringFilter.js
// Copyright (c) 2024- 村人Ａ
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc メッセージウィンドウの文字に、揺らめく熱気や不気味な乱れを思わせるフィルター効果を付加します。
 * @author 村人Ａ
 *
 * @command switchFilter
 * @text フィルターON
 * @desc メッセージウィンドウ文字へのフィルターを適用・開始します。
 *
 * @command offFilter
 * @text フィルターOFF
 * @desc フィルターを解除します。
 *
 * @help
 * ============================================================================
 * 概要
 * ============================================================================
 * このプラグインは、メッセージウィンドウで表示される文字に対して、
 * 不気味な熱気や揺らぎを感じさせるフィルターを適用します。
 * フィルターをONにすると、文字がランダムにゆらめいたり歪んだりする
 * 不安定な視覚効果が加わります。
 * 
 * 「 フィルターOFF」コマンドを使用することで、元の文字表示へ
 * 戻すことができます。
 *
 * ============================================================================
 * プラグインコマンド
 * ============================================================================
 * ### フィルターON
 * メッセージウィンドウ上の文字に揺らめきフィルターを適用します。
 * 
 * 実行後、新たに表示されるメッセージは揺らぎを伴って描画されます。
 *
 * ### フィルターOFF
 * 適用中の揺らめきフィルターを解除します。
 *
 * ============================================================================
 * 使い方
 * ============================================================================
 * 1. **プラグイン導入**
 *    プラグインマネージャーで「villaA_HorrorStringFilter.js」を有効にしてください。
 *
 * 2. **フィルターの適用**
 *    イベントコマンド「プラグインコマンド」で `フィルターON` を実行すると、
 *    メッセージウィンドウの文字に揺らめきフィルターがかかります。
 *
 * 3. **フィルターの解除**
 *    同様に `フィルターOFF` を実行すると、フィルターが元の文字表示に戻ります。
 *
 * ============================================================================
 * 注意事項
 * ============================================================================
 * - フィルター適用中は描画に負荷がかかる可能性があります。
 * - 他の文字描画・メッセージウィンドウ関連プラグインと併用する際は、
 *   事前に動作確認を行ってください。
 *
 * ============================================================================
 * 不具合報告
 * ============================================================================
 * 不具合はXやメールで報告してください。
 * Xアカウント：＠rpgmaker_villaA
 * メール：villaa.contact＠gmail.com
 *
 */

/*:
 * @target MZ
 * @plugindesc Adds a filter effect to message window text that creates a flickering, distorted look reminiscent of heat haze or eerie disturbances. 
 * @author 村人Ａ
 *
 * @command switchFilter
 * @text Filter ON
 * @desc Applies and activates the filter on message window text.
 *
 * @command offFilter
 * @text Filter OFF
 * @desc Removes the filter and restores normal text display.
 *
 * @help
 * ============================================================================
 * ■ Overview
 * ============================================================================
 * This plugin applies a filter effect to message window text, making it appear
 * as if it is flickering, wavering, or distorted—similar to rising heat haze
 * or an unsettling eerie disturbance.  
 *
 * When the filter is ON, new text displayed in the message window will appear
 * unstable and wavering.  
 * Using the **Filter OFF** command restores the text to its original display.  
 *
 * ============================================================================
 * ■ Plugin Commands
 * ============================================================================
 * ### Filter ON
 * Applies the flickering distortion filter to message window text.  
 * Text displayed afterward will be rendered with a wavering distortion effect.  
 *
 * ### Filter OFF
 * Removes the currently applied distortion filter and returns the text to its
 * normal display.  
 *
 * ============================================================================
 * ■ Usage
 * ============================================================================
 * 1. **Enable the Plugin**  
 *    Activate `villaA_HorrorStringFilter.js` in the Plugin Manager.
 *
 * 2. **Apply the Filter**  
 *    Use the event command "Plugin Command" → `Filter ON`.  
 *    Newly displayed message text will have the flickering effect applied.  
 *
 * 3. **Remove the Filter**  
 *    Use the event command "Plugin Command" → `Filter OFF`.  
 *    Text returns to normal display.  
 *
 * ============================================================================
 * ■ Notes
 * ============================================================================
 * - Applying this filter may increase rendering load.  
 * - Test thoroughly when combining with other text-drawing or message window
 *   related plugins.  
 *
 * ============================================================================
 * ■ Bug Reports
 * ============================================================================
 * If you encounter issues, please report them via:  
 * X (Twitter): ＠rpgmaker_villaA  
 * Email: villaa.contact＠gmail.com
 */



{
    'use strict';

    const pluginName = "villaA_HorrorStringFilter";

    //-----------------------------------------------------------------------------
    // HorrorStringFilter
    //

    function HorrorStringFilter() {
        this.initialize(...arguments);
    }

    HorrorStringFilter.prototype = Object.create(PIXI.Filter.prototype);
    HorrorStringFilter.prototype.constructor = HorrorStringFilter;

    HorrorStringFilter.prototype.initialize = function() {
        PIXI.Filter.call(this, null, this._fragmentSrc());
        this.reset();
    };

    HorrorStringFilter.prototype.reset = function() {
        this.uniforms.iTime = 0.0;
	}
	
    HorrorStringFilter.prototype.updateTime = function() {
        this.uniforms.iTime += 0.03;
    };

	HorrorStringFilter.prototype._fragmentSrc = function() { return `varying vec2 vTextureCoord; uniform float iTime; uniform sampler2D uSampler; vec2 random2(vec2 st) { float x = fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123); float y = fract(sin(dot(st, vec2(39.3468, 11.1354))) * 43758.5453123); return vec2(x, y); } void main() { vec2 uv = vTextureCoord.xy; vec4 src = texture2D(uSampler, uv); vec4 addRes = vec4(0.0); float t = floor(iTime * 10.0) / 10.0; for(float i = 0.0; i < 4.0; i++) { float amp = 0.05; vec2 ruv = random2(vec2(i + t, i + t + 4.1252)) * amp - amp / 2.0; vec4 add = texture2D(uSampler, ruv + uv); addRes += add / 2.0; } gl_FragColor = src + step(src.a, 0.1) * addRes; }`; };

	//-----------------------------------------------------------------------------
	// PluginManager
	//
	
	PluginManager.registerCommand(pluginName, "switchFilter", args => {
		if(SceneManager._scene._messageWindow){
			SceneManager._scene._messageWindow.setHorrorStringFilter();
		}
	});
	
	PluginManager.registerCommand(pluginName, "offFilter", args => {
		if(SceneManager._scene._messageWindow){
			SceneManager._scene._messageWindow.removeHorrorStringFilter();
		}
	});
	
    //-----------------------------------------------------------------------------
    // Window_Message
    //

    Window_Message.prototype.setHorrorStringFilter = function() {
		if(this.horrorStringFilter){
			this.horrorStringFilter.reset();
		} else {
			this.horrorStringFilter = new HorrorStringFilter();
			if(!this._contentsSprite.filters){
				this._contentsSprite.filters = [];
			}
			this._contentsSprite.filters.push(this.horrorStringFilter);
		}
	}
	
    Window_Message.prototype.removeHorrorStringFilter = function() {
        this._contentsSprite.filters = this._contentsSprite.filters.filter(f => f != this.horrorStringFilter);
        this.horrorStringFilter = null;
	}
	
    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        _Window_Message_update.call(this);
        if (this.horrorStringFilter) {
            this.horrorStringFilter.updateTime();
        }
    };

};










