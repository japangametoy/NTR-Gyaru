//=============================================================================
// villaA_FaintingFilter.js
// Copyright (c) 2024- 村人Ａ
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc マップ画面に気絶したような歪みとぼかし効果を与えるフィルターを適用します。
 * @author 村人Ａ
 *
 * @command switchFilter
 * @text フィルターのON
 * @desc 気絶フィルターを適用開始します。
 *
 * @command fadeoutFilter
 * @text フィルターを終わる
 * @desc 気絶フィルターを徐々に解除します。
 *
 * @help
 * ============================================================================
 * ■ 概要
 * ============================================================================
 * このプラグインは、マップ画面全体に気絶したような視界の歪みとぼかし効果を与えます。
 * 効果は画面中央を基点とし、動的に変化します。
 *
 * ============================================================================
 * ■ 使い方
 * ============================================================================
 * 1. プラグインマネージャーでこのプラグインを有効化します。
 * 2. イベントコマンド「プラグインコマンド」を使用して以下を実行してください。
 *    - フィルターをONにする:
 *    - フィルターをOFFにする:
 *
 * ============================================================================
 * ■ 注意事項
 * ============================================================================
 * - 他の描画系プラグインやフィルターとの併用時には挙動を確認してください。
 * - 利用規約は以下からご確認ください。
 *   https://www.rpgmaker-script-wiki.xyz/kiyaku.php
 *
 * ============================================================================
 * ■ 不具合報告
 * ============================================================================
 * 不具合は以下の方法で報告してください。
 * Xアカウント：＠rpgmaker_villaA  
 * メール：villaa.contact＠gmail.com
 */

/*:
 * @target MZ
 * @plugindesc Applies a fainting-like distortion and blur effect filter to the map screen. 
 * @author 村人Ａ
 *
 * @command switchFilter
 * @text Filter ON
 * @desc Starts applying the fainting filter.
 *
 * @command fadeoutFilter
 * @text Filter OFF (Fade Out)
 * @desc Gradually removes the fainting filter.
 *
 * @help
 * ============================================================================
 * ■ Overview
 * ============================================================================
 * This plugin applies a distortion and blur effect across the entire map
 * screen, simulating the feeling of fainting. The effect is centered on the
 * screen and dynamically changes over time.
 *
 * ============================================================================
 * ■ How to Use
 * ============================================================================
 * 1. Enable this plugin in the Plugin Manager.  
 * 2. Use the following plugin commands in event commands:  
 *    - **Filter ON**: Applies the fainting filter.  
 *    - **Filter OFF (Fade Out)**: Gradually removes the filter.  
 *
 * ============================================================================
 * ■ Notes
 * ============================================================================
 * - Please verify behavior when combining this plugin with other rendering
 *   or filter plugins.  
 * - Terms of use:  
 *   https://www.rpgmaker-script-wiki.xyz/kiyaku.php
 *
 * ============================================================================
 * ■ Bug Reports
 * ============================================================================
 * If you encounter issues, please report them via:  
 * X (Twitter): ＠rpgmaker_villaA  
 * Email: villaa.contact＠gmail.com
 */


const _0x174c50=_0x4c97;(function(_0x300e82,_0x13c1f5){const _0xe83946=_0x4c97,_0x1eda0a=_0x300e82();while(!![]){try{const _0x279c3c=parseInt(_0xe83946(0xf1))/0x1*(-parseInt(_0xe83946(0xe5))/0x2)+-parseInt(_0xe83946(0xe7))/0x3+parseInt(_0xe83946(0xf3))/0x4+-parseInt(_0xe83946(0xe8))/0x5*(-parseInt(_0xe83946(0xfb))/0x6)+parseInt(_0xe83946(0xe9))/0x7*(parseInt(_0xe83946(0xe4))/0x8)+-parseInt(_0xe83946(0xec))/0x9+-parseInt(_0xe83946(0xeb))/0xa*(parseInt(_0xe83946(0xdc))/0xb);if(_0x279c3c===_0x13c1f5)break;else _0x1eda0a['push'](_0x1eda0a['shift']());}catch(_0x11ee7d){_0x1eda0a['push'](_0x1eda0a['shift']());}}}(_0x2574,0x28838));{_0x174c50(0xf0);const pluginName=_0x174c50(0xf5),param=PluginManager[_0x174c50(0xe2)](pluginName),waveAmp=Number(param['amp'])*0.001,waveFrequency=Number(param[_0x174c50(0xfe)])*0.01;function FaintingFilter(){const _0x3df06a=_0x174c50;this[_0x3df06a(0xf4)](...arguments);}FaintingFilter[_0x174c50(0xf8)]=Object[_0x174c50(0xf7)](PIXI[_0x174c50(0xed)]['prototype']),FaintingFilter['prototype'][_0x174c50(0xee)]=FaintingFilter,FaintingFilter['prototype'][_0x174c50(0xf4)]=function(){const _0x17170a=_0x174c50;PIXI[_0x17170a(0xed)][_0x17170a(0xe6)](this,null,this[_0x17170a(0xf2)]()),this[_0x17170a(0xf6)]();},FaintingFilter[_0x174c50(0xf8)][_0x174c50(0xf6)]=function(){const _0x4e92cd=_0x174c50;this['uniforms'][_0x4e92cd(0xda)]=0x0;},FaintingFilter[_0x174c50(0xf8)][_0x174c50(0xde)]=function(){const _0x2217fc=_0x174c50;this[_0x2217fc(0xfa)]['iTime']+=0.02;},FaintingFilter[_0x174c50(0xf8)][_0x174c50(0xf2)]=function(){const _0xe1ee46=_0x174c50;return _0xe1ee46(0xf9);},PluginManager['registerCommand'](pluginName,_0x174c50(0xdb),_0xfdfed1=>{const _0x4c7f26=_0x174c50;SceneManager[_0x4c7f26(0xe3)][_0x4c7f26(0xd8)]();}),PluginManager[_0x174c50(0xdf)](pluginName,_0x174c50(0xe1),_0x281f0e=>{const _0x33188b=_0x174c50;SceneManager[_0x33188b(0xe3)][_0x33188b(0xfd)]();});const _alias_Scene_Map_createSpriteset=Scene_Map['prototype']['createSpriteset'];Scene_Map[_0x174c50(0xf8)]['createSpriteset']=function(){const _0x6bd413=_0x174c50;_alias_Scene_Map_createSpriteset['call'](this),!this[_0x6bd413(0xfc)][_0x6bd413(0xea)]&&(this[_0x6bd413(0xfc)]['filters']=[]);},Scene_Map[_0x174c50(0xf8)]['setFaintingFilterToSpriteset']=function(){const _0x5d1302=_0x174c50;this[_0x5d1302(0xe0)]?this[_0x5d1302(0xe0)][_0x5d1302(0xf6)]():(this[_0x5d1302(0xe0)]=new FaintingFilter(),this[_0x5d1302(0xfc)][_0x5d1302(0xea)][_0x5d1302(0xef)](this[_0x5d1302(0xe0)]));},Scene_Map[_0x174c50(0xf8)]['removeFaintingFilter']=function(){const _0x51de58=_0x174c50;this[_0x51de58(0xe0)]&&(this[_0x51de58(0xfc)]['filters']=this[_0x51de58(0xfc)][_0x51de58(0xea)][_0x51de58(0xd9)](_0x2a645a=>_0x2a645a!==this[_0x51de58(0xe0)]),this[_0x51de58(0xe0)]=null);;};const _alias_Scene_Map_update=Scene_Map['prototype']['update'];Scene_Map[_0x174c50(0xf8)][_0x174c50(0xdd)]=function(){const _0x3696cf=_0x174c50;_alias_Scene_Map_update[_0x3696cf(0xe6)](this),this['faintingFilter']&&this[_0x3696cf(0xe0)][_0x3696cf(0xde)]();};}function _0x4c97(_0x1bfc1f,_0x5aeaf9){const _0x257445=_0x2574();return _0x4c97=function(_0x4c97e1,_0x354c9b){_0x4c97e1=_0x4c97e1-0xd8;let _0x3f9347=_0x257445[_0x4c97e1];return _0x3f9347;},_0x4c97(_0x1bfc1f,_0x5aeaf9);};function _0x2574(){const _0x353626=['switchFilter','11fqhxZX','update','updateTime','registerCommand','faintingFilter','fadeoutFilter','parameters','_scene','922232QMrUHl','162qXBqST','call','291276UrXink','234915VvptZu','7EGgmGt','filters','1315060ggujjD','736524ZxPeah','Filter','constructor','push','use\x20strict','31rAlGcq','_fragmentSrc','890644hPFnCw','initialize','villaA_FaintingFilter','reset','create','prototype','varying\x20vec2\x20vTextureCoord;\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20float\x20iTime;\x20\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20uniform\x20sampler2D\x20uSampler;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20void\x20main()\x20{\x0a\x09\x09\x09\x09vec2\x20uv\x20=\x20vTextureCoord;\x0a\x09\x09\x09\x09vec2\x20center\x20=\x20vec2(0.5,\x200.5);\x0a\x09\x09\x09\x09float\x20time\x20=\x20iTime\x20*\x200.5;\x0a\x09\x09\x09\x09float\x20ellipseRadius\x20=\x201.0\x20-\x20(abs(sin(time*2.0)*0.7)\x20+\x20time*0.1);\x0a\x09\x09\x09\x09vec2\x20scaledUV\x20=\x20(uv\x20-\x20center);\x0a\x09\x09\x09\x09float\x20ellipseMask\x20=\x20smoothstep(ellipseRadius\x20-\x200.3,\x20ellipseRadius,\x20length(scaledUV*vec2(1.0,\x202.0)));\x0a\x09\x09\x09\x09float\x20blurStrength\x20=\x20ellipseMask;\x0a\x09\x09\x09\x09vec3\x20color\x20=\x20vec3(0.0);\x0a\x09\x09\x09\x09float\x20totalWeight\x20=\x200.0;\x0a\x09\x09\x09\x09for\x20(int\x20x\x20=\x20-2;\x20x\x20<=\x202;\x20x++)\x20{\x0a\x09\x09\x09\x09\x09for\x20(int\x20y\x20=\x20-2;\x20y\x20<=\x202;\x20y++)\x20{\x0a\x09\x09\x09\x09\x09\x09vec2\x20offset\x20=\x20vec2(x,\x20y)\x20*\x200.005\x20*\x20blurStrength;\x0a\x09\x09\x09\x09\x09\x09color\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20offset).rgb;\x0a\x09\x09\x09\x09\x09\x09totalWeight\x20+=\x201.0;\x0a\x09\x09\x09\x09\x09}\x0a\x09\x09\x09\x09}\x0a\x09\x09\x09\x09color\x20/=\x20totalWeight;\x0a\x09\x09\x09\x09float\x20blackoutMask\x20=\x20length(scaledUV\x20*\x20vec2(1.0,\x202.0)\x20*\x20(abs(sin(time*2.0)*0.7)))\x20+\x20iTime*0.15;\x0a\x09\x09\x09\x09vec3\x20finalColor\x20=\x20color\x20-\x20blackoutMask;\x0a\x0a\x09\x09\x09\x09gl_FragColor\x20=\x20vec4(finalColor,\x201.0);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','uniforms','18xtlOlq','_spriteset','removeFaintingFilter','frequency','setFaintingFilterToSpriteset','filter','iTime'];_0x2574=function(){return _0x353626;};return _0x2574();}




























