//=============================================================================
// JunkieFilter.js
// Copyright (c) 2024- 村人Ａ
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc マップ画面にトリップしたような（酔ったような）フィルター効果を付加します。
 * @author 村人Ａ
 *
 * @command switchFilter
 * @text フィルターのON
 * @desc トリップフィルターを適用開始します。マップ表示が酩酊・幻覚的な雰囲気になります。
 *
 * @command offFilter
 * @text フィルターを終わる
 * @desc 現在適用中のトリップフィルターを解除します。
 *
 * @help
 * ============================================================================
 * 概要
 * ============================================================================
 * このプラグインは、マップ画面にトリップしたような不思議なフィルター効果を
 * 与えます。  
 * フィルターをONにすると、画面がゆがんだり色ズレやぼかしが発生し、  
 * 酔ったような、または幻覚を見ているような雰囲気を出せます。
 * これにより、プレイヤーが特殊な状態に陥ったシーンや、現実離れした
 * イベント演出などを行うことができます。
 *
 * ### フィルターのON (switchFilter)
 * トリップフィルターを有効化します。
 * 実行後、マップ上の表示が不安定・幻覚的なエフェクトを伴うようになります。
 *
 * ### フィルターを終わる (offFilter)
 * 適用中のトリップフィルターを解除します。
 * フィルターが外れ、画面は元通りの安定した表示に戻ります。
 *
 * ============================================================================
 * 使い方
 * ============================================================================
 * 1. **プラグイン導入**  
 *    プラグインマネージャーで「JunkieFilter.js」を有効にしてください。
 *
 * 2. **フィルター適用**  
 *    イベントコマンド「プラグインコマンド」で`switchFilter`を実行すると、
 *    マップにトリップフィルターがかかります。
 *
 * 3. **フィルター解除**  
 *    イベントコマンド「プラグインコマンド」で`offFilter`を実行すれば、
 *    トリップフィルターが外れ、正常な表示に戻ります。
 *
 * 例：
 * ```
 * ◆プラグインコマンド：JunkieFilter, フィルターのON
 * （マップ上が酔ったような表示に）
 *
 * --- イベント進行後 ---
 *
 * ◆プラグインコマンド：JunkieFilter, フィルターを終わる
 * （フィルター解除、元の表示へ）
 * ```
 *
 * ============================================================================
 * 注意事項
 * ============================================================================
 * - フィルター適用中は描画負荷が増す可能性があります。
 * - 他のフィルタープラグインとの競合を避けるため、テストプレイを推奨します。
 *
 * ============================================================================
 * 不具合報告
 * ============================================================================
 * 不具合はXまたはメールで報告してください。
 * Xアカウント：＠rpgmaker_villaA
 * メール：villaa.contact＠gmail.com
 *
 */
 
 /*:
 * @target MZ
 * @plugindesc Adds a trippy (drunken or hallucinatory) filter effect to the map screen.  
 * @author 村人Ａ
 *
 * @command switchFilter
 * @text Filter ON
 * @desc Enables the trippy filter. The map screen will appear distorted and hallucinatory.
 *
 * @command offFilter
 * @text Filter OFF
 * @desc Disables the trippy filter and restores normal display.
 *
 * @help
 * ============================================================================
 * ■ Overview
 * ============================================================================
 * This plugin applies a surreal trippy filter effect to the map screen.  
 * When the filter is enabled, the screen will appear distorted with color 
 * shifts and blurring, creating a drunken or hallucinatory atmosphere.  
 *
 * This can be used to represent special status effects on the player 
 * or to emphasize surreal or dream-like story events.
 *
 * ### Filter ON (switchFilter)  
 * Activates the trippy filter. The map will appear unstable and distorted.  
 *
 * ### Filter OFF (offFilter)  
 * Removes the filter and restores the screen to its normal state.  
 *
 * ============================================================================
 * ■ How to Use
 * ============================================================================
 * 1. **Enable the Plugin**  
 *    Activate "JunkieFilter.js" in the Plugin Manager.  
 *
 * 2. **Apply the Filter**  
 *    Use the `switchFilter` plugin command in an event to enable the effect.  
 *
 * 3. **Remove the Filter**  
 *    Use the `offFilter` plugin command to disable the effect and return to 
 *    normal visuals.  
 *
 * Example:  
 * ```
 * ◆Plugin Command: JunkieFilter, Filter ON  
 * (The map takes on a distorted, drunken appearance)  
 *
 * --- After some time or event progression ---  
 *
 * ◆Plugin Command: JunkieFilter, Filter OFF  
 * (The filter fades out and the map returns to normal)  
 * ```
 *
 * ============================================================================
 * ■ Notes
 * ============================================================================
 * - Rendering load may increase while the filter is active.  
 * - Test thoroughly when using alongside other filter-related plugins to 
 *   prevent conflicts.  
 *
 * ============================================================================
 * ■ Bug Reports
 * ============================================================================
 * Please report any issues via:  
 * X (Twitter): ＠rpgmaker_villaA  
 * Email: villaa.contact＠gmail.com
 *
 */

 
 
 
 const _0x13fb67=_0x4cca;function _0x4cca(_0x21a554,_0x5b6a74){const _0x269e00=_0x269e();return _0x4cca=function(_0x4ccaa7,_0x40e07c){_0x4ccaa7=_0x4ccaa7-0x14a;let _0x31d31b=_0x269e00[_0x4ccaa7];return _0x31d31b;},_0x4cca(_0x21a554,_0x5b6a74);}(function(_0x50fed7,_0x5b1fd7){const _0x4a9eba=_0x4cca,_0x292503=_0x50fed7();while(!![]){try{const _0x290189=-parseInt(_0x4a9eba(0x173))/0x1*(-parseInt(_0x4a9eba(0x151))/0x2)+parseInt(_0x4a9eba(0x165))/0x3+-parseInt(_0x4a9eba(0x156))/0x4*(parseInt(_0x4a9eba(0x159))/0x5)+-parseInt(_0x4a9eba(0x161))/0x6+parseInt(_0x4a9eba(0x15e))/0x7*(-parseInt(_0x4a9eba(0x170))/0x8)+parseInt(_0x4a9eba(0x160))/0x9+-parseInt(_0x4a9eba(0x150))/0xa*(parseInt(_0x4a9eba(0x14d))/0xb);if(_0x290189===_0x5b1fd7)break;else _0x292503['push'](_0x292503['shift']());}catch(_0x1fe51c){_0x292503['push'](_0x292503['shift']());}}}(_0x269e,0x4de4a));function _0x269e(){const _0x238a54=['5360509rZTsyz','junkieFilter','villaA_JunkieFilter','10VnXrPP','58MqDEMZ','Filter','call','_spriteset','prototype','8LGgZNK','reset','offFilter','624655wGaFKc','switchJunkieFilter','height','initialize','filterArea','101521YdeJhA','use\x20strict','3539799hWyCXN','481806ZFrFYs','amp','Rectangle','width','603312pANqAo','registerCommand','updateTime','_fragmentSrc','screenY','screenX','setJunkieFilterToSpriteset','_tilemap','uniforms','remove','_scene','24iGgYWR','removeJunkieFilter','createSpriteset','20194XihuKd','filters','filter','constructor','push'];_0x269e=function(){return _0x238a54;};return _0x269e();}{_0x13fb67(0x15f);const pluginName=_0x13fb67(0x14f);function JunkieFilter(){const _0x46d2f5=_0x13fb67;this[_0x46d2f5(0x15c)](...arguments);}JunkieFilter[_0x13fb67(0x155)]=Object['create'](PIXI[_0x13fb67(0x152)][_0x13fb67(0x155)]),JunkieFilter[_0x13fb67(0x155)][_0x13fb67(0x14b)]=JunkieFilter,JunkieFilter[_0x13fb67(0x155)][_0x13fb67(0x15c)]=function(){const _0x529c45=_0x13fb67;PIXI['Filter'][_0x529c45(0x153)](this,null,this['_fragmentSrc']()),this['isFadeout']=![],this[_0x529c45(0x157)]();},JunkieFilter['prototype'][_0x13fb67(0x157)]=function(){const _0x3ed437=_0x13fb67;this[_0x3ed437(0x16d)][_0x3ed437(0x162)]=0x0,this[_0x3ed437(0x16d)]['playerPos']=[$gamePlayer[_0x3ed437(0x16a)]()/Graphics[_0x3ed437(0x164)],($gamePlayer[_0x3ed437(0x169)]()-0x18)/Graphics['height']];},JunkieFilter['prototype'][_0x13fb67(0x16e)]=function(){const _0x43fb46=_0x13fb67;$gameSystem[_0x43fb46(0x15a)]=![],SceneManager[_0x43fb46(0x16f)]&&SceneManager[_0x43fb46(0x16f)][_0x43fb46(0x171)]&&SceneManager['_scene']['removeJunkieFilter']();},JunkieFilter[_0x13fb67(0x155)]['updateTime']=function(){const _0x26d0c7=_0x13fb67;this[_0x26d0c7(0x16d)]['playerPos']=[$gamePlayer[_0x26d0c7(0x16a)]()/Graphics[_0x26d0c7(0x164)],($gamePlayer[_0x26d0c7(0x169)]()-0x18)/Graphics[_0x26d0c7(0x15b)]];},JunkieFilter[_0x13fb67(0x155)][_0x13fb67(0x168)]=function(){return'\x0a\x09\x09\x09varying\x20vec2\x20vTextureCoord;\x0a\x09\x09\x09uniform\x20vec2\x20playerPos;\x0a\x09\x09\x09uniform\x20sampler2D\x20uSampler;\x0a\x09\x09\x09void\x20main()\x20{\x0a\x09\x09\x09\x09vec2\x20uv\x20=\x20vTextureCoord.xy;\x0a\x09\x09\x09\x09vec2\x20direction\x20=\x20uv\x20-\x20playerPos;\x0a\x09\x09\x09\x09float\x20distance\x20=\x20length(direction);\x0a\x09\x09\x09\x09float\x20chromaStrength\x20=\x200.2;\x0a\x09\x09\x09\x09vec2\x20offsetR\x20=\x20uv\x20+\x20chromaStrength\x20*\x20direction\x20*\x20distance;\x0a\x09\x09\x09\x09vec2\x20offsetG\x20=\x20uv;\x0a\x09\x09\x09\x09vec2\x20offsetB\x20=\x20uv\x20-\x20chromaStrength\x20*\x20direction\x20*\x20distance;\x0a\x09\x09\x09\x09float\x20r\x20=\x20texture2D(uSampler,\x20offsetR).r;\x0a\x09\x09\x09\x09float\x20g\x20=\x20texture2D(uSampler,\x20offsetG).g;\x0a\x09\x09\x09\x09float\x20b\x20=\x20texture2D(uSampler,\x20offsetB).b;\x0a\x09\x09\x09\x09vec4\x20chromaColor\x20=\x20vec4(r,\x20g,\x20b,\x201.0);\x0a\x09\x09\x09\x09float\x20blurStrength\x20=\x20smoothstep(0.0,\x201.0,\x20distance)\x20*\x200.03;\x0a\x09\x09\x09\x09vec4\x20blurredColor\x20=\x20vec4(0.0);\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(-1.0,\x20-1.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(\x200.0,\x20-1.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(\x201.0,\x20-1.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(-1.0,\x20\x200.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(\x200.0,\x20\x200.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(\x201.0,\x20\x200.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(-1.0,\x20\x201.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(\x200.0,\x20\x201.0));\x0a\x09\x09\x09\x09blurredColor\x20+=\x20texture2D(uSampler,\x20uv\x20+\x20blurStrength\x20*\x20vec2(\x201.0,\x20\x201.0));\x0a\x09\x09\x09\x09blurredColor\x20/=\x209.0;\x0a\x09\x09\x09\x09gl_FragColor\x20=\x20mix(chromaColor,\x20blurredColor,\x200.5);\x0a\x09\x09\x09}\x0a\x20\x20\x20\x20\x20\x20\x20\x20';},PluginManager['registerCommand'](pluginName,'switchFilter',_0x326565=>{const _0x116a7e=_0x13fb67;$gameSystem[_0x116a7e(0x15a)]=!![],SceneManager[_0x116a7e(0x16f)]['setJunkieFilterToSpriteset']();}),PluginManager[_0x13fb67(0x166)](pluginName,_0x13fb67(0x158),_0x1a9f94=>{const _0x57c2ad=_0x13fb67;if(!SceneManager[_0x57c2ad(0x16f)]['junkieFilter'])return;SceneManager[_0x57c2ad(0x16f)][_0x57c2ad(0x14e)][_0x57c2ad(0x16e)]();});const _alias_Game_System_initialize=Game_System[_0x13fb67(0x155)][_0x13fb67(0x15c)];Game_System[_0x13fb67(0x155)][_0x13fb67(0x15c)]=function(){const _0x16d010=_0x13fb67;_alias_Game_System_initialize[_0x16d010(0x153)](this),this[_0x16d010(0x15a)]=![];};const _alias_Scene_Map_createSpriteset=Scene_Map['prototype'][_0x13fb67(0x172)];Scene_Map[_0x13fb67(0x155)][_0x13fb67(0x172)]=function(){const _0x3e269f=_0x13fb67;_alias_Scene_Map_createSpriteset['call'](this),!this[_0x3e269f(0x154)][_0x3e269f(0x16c)][_0x3e269f(0x174)]&&(this[_0x3e269f(0x154)][_0x3e269f(0x16c)][_0x3e269f(0x174)]=[]),$gameSystem[_0x3e269f(0x15a)]&&this[_0x3e269f(0x16b)]();},Scene_Map[_0x13fb67(0x155)][_0x13fb67(0x16b)]=function(){const _0x52e0ab=_0x13fb67;if(this[_0x52e0ab(0x14e)])this['junkieFilter'][_0x52e0ab(0x157)]();else{const _0x2aef79=this[_0x52e0ab(0x154)][_0x52e0ab(0x16c)];this[_0x52e0ab(0x14e)]=new JunkieFilter(),_0x2aef79[_0x52e0ab(0x174)][_0x52e0ab(0x14c)](this[_0x52e0ab(0x14e)]),_0x2aef79[_0x52e0ab(0x15d)]=new PIXI[(_0x52e0ab(0x163))](0x0,0x0,_0x2aef79['width'],_0x2aef79[_0x52e0ab(0x15b)]);}},Scene_Map['prototype']['removeJunkieFilter']=function(){const _0x55b095=_0x13fb67;this[_0x55b095(0x14e)]&&(this[_0x55b095(0x154)][_0x55b095(0x16c)][_0x55b095(0x174)]=this['_spriteset'][_0x55b095(0x174)][_0x55b095(0x14a)](_0x276ce8=>_0x276ce8!==this[_0x55b095(0x14e)]),this[_0x55b095(0x14e)]=null);;};const _alias_Scene_Map_update=Scene_Map[_0x13fb67(0x155)]['update'];Scene_Map[_0x13fb67(0x155)]['update']=function(){const _0x1d1821=_0x13fb67;_alias_Scene_Map_update[_0x1d1821(0x153)](this),this[_0x1d1821(0x14e)]&&this[_0x1d1821(0x14e)][_0x1d1821(0x167)]();};};






























