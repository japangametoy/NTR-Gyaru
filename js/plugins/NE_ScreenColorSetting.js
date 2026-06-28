//=============================================================================
// NE_ScreenColorSetting.js
//=============================================================================
// Copyright (c) 2023 Nao Endo
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//
//  Version
//  1.0.0 2023/12/24 公開
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 任意の色調設定をプラグインコマンドで呼び出します。
 * @author Nao Endo
 * @url
 * @help ■ このプラグインについて
 * イベントコマンド『画面の色調変更』の拡張プラグインです。
 * 任意の色調設定を保存し、プラグインコマンドから呼び出せるようになります。
 * ウェイトやフレーム数は呼び出し側で設定できます。
 * ※ 画面のフェードイン、フェードアウトには対応していません。
 * ※ ツクールMVには対応していません。
 * ※ デフォルトで設定をいくつか用意してあります。
 * 
 * ■ 何の役に立つの？
 * 画面色調設定は様々なシーンで使いますが、
 * 毎回設定をしたりコピペして持ってくるのは手間です。
 * また、設定した色調を変更しようとすると
 * 関連するイベントをひとつひとつ手作業で修正する必要があります。
 * 
 * 本プラグインでは色調設定をプラグインの管理画面で一括管理している為、
 * 一度登録してしまえば名前で呼び出すだけで色調設定を行えます。
 * 
 * さらに、管理画面の色調設定を変更すれば
 * その色調設定を利用している箇所全てに変更が適用されるようになります。
 * 
 * ■ 使い方
 * 1.パラメータの色調設定リストを開きます。
 * 2.数値が書いてある空白の列をダブルクリックします。
 * 3.任意の色調設定、名前をつけます。
 * 4.イベントのプラグインコマンドを開き、設定した名前を入れて下さい。
 * 5.設定した色調設定が適用されます！
 * ※ 各パラメータは必須なので、入力漏れがあると動きません。
 * ※ 登録済データの更新、削除も可能です。
 * 
 * ■ 利用規約
 * 作者に無断で改変、再配布が可能で、
 * 利用形態（商用、18禁利用等）についても制限はありません。
 * 
 * @command ChangeScreenColors
 *     @text 画面色調設定
 *     @desc 
 *     @arg name
 *         @text 色調設定名(必須)
 *         @desc 呼び出す色調設定の名前を入力して下さい。
 *         @type string
 *     @arg frame
 *         @text 色調変更のフレーム数(必須)
 *         @desc 1～999の範囲で設定可能です。
 *               1フレーム = 1/60秒  (0.5秒 = 30フレーム)
 *         @type number
 *             @min 1
 *             @max 999
 *         @default 1
 *     @arg isWaiting
 *         @text ウェイト(必須)
 *         @desc ON:ウェイトあり OFF:ウェイトなし
 *         @type boolean
 *         @default true
 * 
 * @param setScreenColors
 *     @text 色調設定
 *     @desc 空白の列をﾀﾞﾌﾞﾙｸﾘｯｸすると新規追加できます。(一覧画面のみ)
 *           任意の設定をｸﾘｯｸ → deleteキーで削除できます。
 *     @type struct<ScreenColorSetting>[]
 *     @default ["{\"name\":\"通常\",\"red\":\"0\",\"green\":\"0\",\"blue\":\"0\",\"gray\":\"0\"}","{\"name\":\"ダーク\",\"red\":\"-68\",\"green\":\"-68\",\"blue\":\"-68\",\"gray\":\"0\"}","{\"name\":\"セピア\",\"red\":\"34\",\"green\":\"-34\",\"blue\":\"-68\",\"gray\":\"170\"}","{\"name\":\"夕暮れ\",\"red\":\"68\",\"green\":\"-34\",\"blue\":\"-34\",\"gray\":\"0\"}","{\"name\":\"夜\",\"red\":\"-68\",\"green\":\"-68\",\"blue\":\"0\",\"gray\":\"68\"}","{\"name\":\"真っ白\",\"red\":\"255\",\"green\":\"255\",\"blue\":\"255\",\"gray\":\"0\"}","{\"name\":\"真っ黒\",\"red\":\"-255\",\"green\":\"-255\",\"blue\":\"-255\",\"gray\":\"0\"}"]
 */
/*~struct~ScreenColorSetting:
 *  @param name
 *      @text 名前(必須、重複NG)
 *      @desc プラグインコマンドから呼び出す為の名前です。
 *            他の色調設定と重複すると呼び出せません。
 *      @type string
 *
 *  @param red
 *      @text 赤(必須)
 *      @desc 赤の色調設定です。(-255～255まで。0がデフォルト)
 *      @type number
 *          @min -255
 *          @max 255
 *      @default 0
 * 
 *  @param green
 *      @text 緑(必須)
 *      @desc 緑の色調設定です。(-255～255まで。0がデフォルト)
 *      @type number
 *          @min -255
 *          @max 255
 *      @default 0
 * 
 *  @param blue
 *      @text 青 (必須)
 *      @desc 青の色調設定です。(-255～255まで。0がデフォルト)
 *      @type number
 *          @min -255
 *          @max 255
 *      @default 0
 * 
 *  @param gray
 *      @text グレー(必須)
 *      @desc 彩度の色調設定です。(0～255まで。0がデフォルト)
 *      @type number
 *          @min 0
 *          @max 255
 *      @default 0
 * 
 * 
 */
(() => {
    'use strict';

    // プラグイン名の設定
    const PLUGIN_NAME = "NE_ScreenColorSetting";
    const parameters = PluginManager.parameters(PLUGIN_NAME);
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };

    const param_SetColors = JSON.parse(parameters['setScreenColors'], paramReplace);

    /**
     * 画面色調設定の呼び出しと色調変更処理
     */
    PluginManager.registerCommand(PLUGIN_NAME, "ChangeScreenColors", function(args) {
        const param = args;

        const colorSettingDataList = validateParams(param);
        
        const red = parseInt(colorSettingDataList[0].red);
        const green = parseInt(colorSettingDataList[0].green);
        const blue = parseInt(colorSettingDataList[0].blue);
        const gray = parseInt(colorSettingDataList[0].gray);
        const frame = parseInt(param.frame);
        const isWaiting = typeof param.isWaiting === 'string' ? param.isWaiting.toLocaleLowerCase() === 'true' || param.isWaiting == '1' : Boolean(param.isWaiting);

        if (isWaiting) {
            $gameScreen.startTint([red, green, blue, gray], frame);
            this.wait(param.frame);
        } else {
            $gameScreen.startTint([red, green, blue, gray], frame);
        }
    });

    /**
     * パラメータの整合性確認
     */
    const validateParams = function(args) {
        if (!args.name) {
            throw new Error("呼び出す色調設定名を指定して下さい。");
        }

        const filteredSetDataList = param_SetColors.filter(object => object.name === args.name);
        const getSettingDataCount = filteredSetDataList.length;

        if (getSettingDataCount != 1) {
            if (getSettingDataCount == 0) {
                throw new Error("色調設定名『" + args.name + "』は存在しません。");
            } else {
                throw new Error("色調設定名『" + args.name + "』は重複しています。");
            }
        }

        let errorMsg = [];
        if (args.isWaiting != 'true' && args.isWaiting != 'false') {
            errorMsg.push("ウェイトの設定が正しくありません。");
        }

        if (!args.frame) {
            errorMsg.push("色調時間のフレーム数を設定して下さい。");
        }

        if (!filteredSetDataList[0].red) {
            errorMsg.push("赤の色調設定値が正しくありません。");
        }

        if (!filteredSetDataList[0].green) {
            errorMsg.push("緑の色調設定値が正しくありません。");
        }

        if (!filteredSetDataList[0].blue) {
            errorMsg.push("青の色調設定値が正しくありません。");
        }

        if (!filteredSetDataList[0].gray) {
            errorMsg.push("グレーの色調設定値が正しくありません。");
        }

        if (errorMsg.length > 0) {
            throw new Error(errorMsg.join());
        }

        return filteredSetDataList;
    };
  })();