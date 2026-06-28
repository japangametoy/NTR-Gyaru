//-----------------------------------------------------------------------------
//  Galv's Choice Pause MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_ChoicePauseMZ.js
//-----------------------------------------------------------------------------
//  2017-01-27 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_ChoicePause = true;

var Galv = Galv || {};              // Galv's main object
Galv.CPAUSE = Galv.CPAUSE || {};    // Galv's stuff

/*:ja
 * @plugindesc (v.1.0) 一時停止を追加して、プレーヤーが誤って選択肢を決定するのを防ぎます。
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 * 
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 * 
 * 元プラグイン:
 * https://galvs-scripts.com/2020/10/18/mz-choice-pause/
 * 
 *   Galv's Choice Pause MZ
 * ----------------------------------------------------------------------------
 * 選択ウィンドウが開いた後、
 * プレーヤーが選択を選択できない数フレームの一時停止を追加します。
 * ウィンドウが素早くポップアップし、
 * テキストボックスの進行中に気付かない状態で、
 * プレーヤーが誤って選択肢を決定する可能性を減らすためです。
 * 
 * 
 * @param Pause Time
 * @text 一時停止時間
 * @desc プレイヤーが選択する前に一時停止するフレーム数
 * @default 20
 */
//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.CPAUSE.time = Number(PluginManager.parameters('GALV_ChoicePauseMZ')['Pause Time']);

Galv.CPAUSE.Window_ChoiceList_open = Window_ChoiceList.prototype.open;
Window_ChoiceList.prototype.open = function() {
	this._pauseTime = Graphics.frameCount + Galv.CPAUSE.time;
	Galv.CPAUSE.Window_ChoiceList_open.call(this);
};

Galv.CPAUSE.Window_ChoiceList_isOkTriggered = Window_ChoiceList.prototype.isOkTriggered;
Window_ChoiceList.prototype.isOkTriggered = function() {
	return Galv.CPAUSE.Window_ChoiceList_isOkTriggered.call(this) && Graphics.frameCount > this._pauseTime;
};