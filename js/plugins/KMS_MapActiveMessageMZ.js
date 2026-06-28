//=============================================================================
// KMS_MapActiveMessageMz.js
//   Last update: 2025/08/17
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Automatically display messages above event characters.
 * @author Original: Kameo (Kamesoft) (Modified by Nameless Man)
 * @url https://kamesoft.github.io/
 *
 * @param maxMessageCount
 * @text Max message count
 * @desc Max number of active messages.
 * @type number
 * @default 15
 *
 * @param defaultRange
 * @text Default range
 * @desc Default distance for displaying message by tile unit.
 * @type number
 * @default 4
 *
 * @param displayDuration
 * @text Display duration
 * @desc Display frame count.
 * @type number
 * @default 300
 *
 * @param fadeFrameCount
 * @text Fade frame count
 * @desc The number of frames it takes for the message to fade out.
 * @type number
 * @default 10
 *
 * @param fontSize
 * @text Font size
 * @desc Specifies the font size of the message in pixels.
 * @type number
 * @default 18
 *
 * @param messageSkin
 * @text Message skin
 * @desc Message skin for the active message. Load from img/system.
 * @require 1
 * @dir img/system/
 * @type file
 * @default ActiveMessageSkin
 *
 * @help
 * This plugin provides commands to enable or disable the active message system.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc プレイヤーが近付いたときに、自動的にメッセージを表示するイベントを作成します。
 * @author 改変元：かめお (Kamesoft) 様 (改変：名もなき人)
 * @url https://kamesoft.github.io/
 *
 * @param maxMessageCount
 * @text 表示メッセージ最大数
 * @desc 表示できるメッセージの最大数です。
 * @type number
 * @default 15
 *
 * @param defaultRange
 * @text デフォルト表示距離
 * @desc メッセージを表示する距離をタイル単位で指定します。
 * @type number
 * @default 4
 *
 * @param displayDuration
 * @text 表示時間
 * @desc メッセージ表示時間をフレーム単位で指定します。
 * @type number
 * @default 300
 *
 * @param fadeFrameCount
 * @text フェードアウト時間
 * @desc メッセージのフェードアウトにかかるフレーム数を指定します。
 * @type number
 * @default 10
 *
 * @param fontSize
 * @text フォントサイズ
 * @desc メッセージのフォントサイズをピクセル単位で指定します。
 * @type number
 * @default 18
 *
 * @param messageSkin
 * @text メッセージスキン
 * @desc メッセージの表示に使用するスキン画像です。 img/system から読み込みます。
 * @require 1
 * @dir img/system/
 * @type file
 * @default ActiveMessageSkin
 *
 * @help
 * このプラグインは、アクティブメッセージシステムを有効化・無効化するコマンドを提供します。
 *
 */

(function() {
    'use strict';

    const pluginName = document.currentScript.src.match(/^.*\/(.*)\.js$/)[1];

    // パラメータを読み込み、直接 `param` オブジェクトに格納
    const parameters = PluginManager.parameters(pluginName);

    // `param` 定数オブジェクトを定義し、各パラメータをプロパティとして格納
    const param = {
        maxMessageCount: Number(parameters.maxMessageCount || 15),
        defaultRange: Number(parameters.defaultRange || 4),
        displayDuration: Number(parameters.displayDuration || 300),
        fadeFrameCount: Number(parameters.fadeFrameCount || 10),
        fontSize: Number(parameters.fontSize || 18),
        messageSkin: String(parameters.messageSkin || 'ActiveMessageSkin')
    };

    // 定数
    var Const =
    {
        regex: {
            activeMessage:   /<(?:アクティブメッセージ|ActiveMessage)\s*[:\s]([^>]*)>/i,
            displayRange:    /<(?:アクティブメッセージ距離|ActiveMessageRange)\s*[:\s]\s*(\d+)>/i,
            displayDuration: /<(?:アクティブメッセージ表示時間|ActiveMessageDuration)\s*[:\s]\s*(\d+)>/i,
            loopMessage:     /<(?:アクティブメッセージループ|ActiveMessageLoop)>/i,
            beginMessage:    /<(?:アクティブメッセージ|ActiveMessage)\s*[:\s][^>]+$/i,
            endMessage:      /([^>]*)>/
        },
    };

    function isNullOrUndefined(value)
    {
        return value === null || value === undefined;
    }

    // デフォルト値つきで文字列から int を解析
    function parseIntWithDefault(param, defaultValue)
    {
        var value = parseInt(param);
        return isNaN(value) ? defaultValue : value;
    }

    //-----------------------------------------------------------------------------
    // Game_Temp
    //-----------------------------------------------------------------------------

    var _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function()
    {
        _Game_Temp_initialize.call(this);

        this.clearMapActiveMessage();
    };

    /**
     * アクティブメッセージの登録
     */
    Game_Temp.prototype.pushMapActiveMessages = function(targetEvent, messages, needsLoop, isForced)
    {
        // 追加: 既にキューに同じイベントのメッセージが存在するかをチェック
        const isAlreadyQueued = this._mapActiveMessages.some(
            msg => msg.event.eventId() === targetEvent.eventId()
        );

        if (isAlreadyQueued) {
            return;
        }

        var message =
        {
            id: this._mapActiveMessageNextId++,
            event: targetEvent,
            messages: messages,
            needsLoop: needsLoop,
            isForced: isForced
        };
        this._mapActiveMessages.push(message);
    };

    /**
     * アクティブメッセージのクリア
     */
    Game_Temp.prototype.clearMapActiveMessage = function()
    {
        this._mapActiveMessageNextId = 0;
        this._mapActiveMessages = [];
    };

    //-----------------------------------------------------------------------------
    // Game_System
    //-----------------------------------------------------------------------------

    /**
     * アクティブメッセージの有効状態を取得
     */
    Game_System.prototype.isMapActiveMessageEnabled = function()
    {
        return !isNullOrUndefined(this._mapActiveMessageEnabled) ?
            this._mapActiveMessageEnabled :
            true;
    };

    /**
     * アクティブメッセージの有効状態を設定
     */
    Game_System.prototype.setMapActiveMessageEnabled = function(enabled)
    {
        this._mapActiveMessageEnabled = !!enabled;
    };


    //-----------------------------------------------------------------------------
    // Game_Map
    //-----------------------------------------------------------------------------

    var _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId)
    {
        _Game_Map_setup.call(this, mapId);

        this.initializeActiveMessage();
    };

    /**
     * アクティブメッセージの初期化
     */
    Game_Map.prototype.initializeActiveMessage = function()
    {
        // 最初は全イベントの表示済みフラグを解除
        this.clearActiveMessageShownFlags();
    };

    /**
     * アクティブメッセージの表示済みフラグを解除
     */
    Game_Map.prototype.clearActiveMessageShownFlags = function()
    {
        this.events().forEach(function(event)
        {
            event.setMapActiveMessageShown(false);
        });

        this.requestUpdateActiveMessage();
    };

    /**
     * アクティブメッセージの更新要求
     */
    Game_Map.prototype.requestUpdateActiveMessage = function()
    {
        this._needsUpdateActiveMessage = true;
    };

    var _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive)
    {
        _Game_Map_update.call(this, sceneActive);
    };

    var _Game_Map_refresh = Game_Map.prototype.refresh;
    Game_Map.prototype.refresh = function()
    {
        _Game_Map_refresh.call(this);

        this.requestUpdateActiveMessage();
    };


    //-----------------------------------------------------------------------------
    // Game_CharacterBase
    //-----------------------------------------------------------------------------

    var _Game_CharacterBase = Game_CharacterBase.prototype.setDirection;
    Game_CharacterBase.prototype.setDirection = function(d)
    {
        _Game_CharacterBase.call(this, d);

        // 移動時には方向指定があるはずなので、ここでメッセージの更新要求を出す
        if (!isNullOrUndefined($gameMap))
        {
            $gameMap.requestUpdateActiveMessage();
        }
    };


    //-----------------------------------------------------------------------------
    // Game_Player
    //-----------------------------------------------------------------------------

    /**
     * アクティブメッセージを表示可能なイベントを探す
     */
    Game_Player.prototype.findAvailableMapActiveMessageEvents = function()
    {
        if (!this.canMove())
        {
            return [];
        }

        var candidateEvents = $gameMap.events().filter(function(event)
        {
            return event.hasMapActiveMessage() &&
                !event.isMapActiveMessageShown() &&
                this.calcDistanceForMapActiveMessage(event) <= event.getMapActiveMessageRange();
        }, this);

        return candidateEvents;
    };

    Game_Player.prototype.calcDistanceForMapActiveMessage = function(event)
    {
        var diffX = this.x - event.x;
        var diffY = this.y - event.y;

        return Math.sqrt(diffX * diffX + diffY * diffY);
    };


    //-----------------------------------------------------------------------------
    // Game_Event
    //-----------------------------------------------------------------------------

    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function()
    {
        _Game_Event_setupPage.call(this);

        this.setupMapActiveMessage();
    };

    /**
     * 現在のページ番号を取得
     */
    Game_Event.prototype.pageIndex = function()
    {
        return this._pageIndex;
    };

    /**
     * アクティブメッセージを構築
     */
    Game_Event.prototype.setupMapActiveMessage = function()
    {
        if (this._mapActiveMessageList && this._pageIndex === this.pageIndex() && this._mapActiveMessageList.length > 0) {
            return;
        }

        this._mapActiveMessageList      = [];
        this._mapActiveMessageRange     = param.defaultRange;
        this._mapActiveMessageDuration  = param.displayDuration;
        this._needsMapActiveMessageLoop = false;
        this._isMapActiveMessageShown   = false;

        var page = this.page();
        if (isNullOrUndefined(page))
        {
            return;
        }

        var parsed = this.parseCommentForMapActiveMessage(page);
        var mergedComment = parsed.mergedComment;
        var commentUnits = parsed.commentUnits;

        // メッセージ距離を解析
        var rangeMatch = Const.regex.displayRange.exec(mergedComment);
        if (!isNullOrUndefined(rangeMatch))
        {
            this._mapActiveMessageRange = param.defaultRange;
        }

        // ループ設定を解析
        var loopMatch = Const.regex.loopMessage.exec(mergedComment);
        if (!isNullOrUndefined(loopMatch))
        {
            this._needsMapActiveMessageLoop = true;
        }

        commentUnits.forEach(
            function (unit)
            {
                // メッセージ定義を解析
                var messageMatch = Const.regex.activeMessage.exec(unit);
                if (!isNullOrUndefined(messageMatch))
                {
                    this._mapActiveMessageList.push(
                        {
                            text: messageMatch[1],
                            duration: this._mapActiveMessageDuration
                        });
                }

                // メッセージ表示時間を解析
                var durationMatch = Const.regex.displayDuration.exec(unit);
                if (!isNullOrUndefined(durationMatch))
                {
                    var duration = parseIntWithDefault(durationMatch[1], param.displayDuration);
                    this._mapActiveMessageDuration = duration;

                    // 直前のメッセージの duration を変更
                    if (this._mapActiveMessageList.length > 0)
                    {
                        this._mapActiveMessageList[this._mapActiveMessageList.length - 1]
                            .duration = duration;
                    }
                }
            }, this);
    };

    /**
     * アクティブメッセージ用のコメント解析
     *
     * @param {Object}  page    解析対象のイベントページ
     */
    Game_Event.prototype.parseCommentForMapActiveMessage = function(page)
    {
        function isComment(command)
        {
            return command && (command.code === 108 || command.code === 408);
        }

        // 注釈以外に達するまで解析
        var commandIndex  = 0;
        var command       = page.list[commandIndex];
        var mergedComment = '';  // コメントを結合した文字列
        var commentUnit   = '';
        var commentUnits  = [];  // 解析単位ごとに結合した文字列のリスト
        var inMessage     = false;
        while (isComment(command))
        {
            if (mergedComment.length > 0)
            {
                mergedComment += '\n';
            }

            var commentText = command.parameters[0];
            mergedComment += commentText;

            if (inMessage)
            {
                if (commentUnit.length > 0)
                {
                    commentUnit += '\n';
                }

                commentUnit += commentText;

                if (Const.regex.endMessage.test(commentText))
                {
                    commentUnits.push(commentUnit);
                    commentUnit = '';
                    inMessage = false;
                }
            }
            else
            {
                if (Const.regex.beginMessage.test(commentText))
                {
                    commentUnit = commentText;
                    inMessage = true;
                }
                else
                {
                    commentUnits.push(commentText);
                }
            }

            command = page.list[++commandIndex];
        }

        if (inMessage)
        {
            commentUnits.push(commentUnit);
        }

        return {
            mergedComment: mergedComment,
            commentUnits: commentUnits
        };
    }

    /**
     * アクティブメッセージを取得
     *
     * @return {String} メッセージ
     */
    Game_Event.prototype.getMapActiveMessages = function()
    {
        return this._mapActiveMessageList;
    };

    /**
     * アクティブメッセージが存在するか
     *
     * @return {Boolean} true if exists
     */
    Game_Event.prototype.hasMapActiveMessage = function()
    {
        return this._mapActiveMessageList.length !== 0;
    };

    /**
     * アクティブメッセージを表示可能な範囲
     *
     * @return {Number} タイル単位の表示範囲半径
     */
    Game_Event.prototype.getMapActiveMessageRange = function()
    {
        return this._mapActiveMessageRange;
    };

    /**
     * アクティブメッセージをループするか
     *
     * @return {Boolean} true if needs loop
     */
    Game_Event.prototype.needsMapActiveMessageLoop = function()
    {
        return this._needsMapActiveMessageLoop;
    };

    /**
     * アクティブメッセージを表示済みか
     *
     * @return {Boolean} true if shown
     */
    Game_Event.prototype.isMapActiveMessageShown = function()
    {
        return this._isMapActiveMessageShown;
    };

    /**
     * アクティブメッセージ表示済みかどうかを設定
     *
     * @param {Boolean} shown 設定する値
     */
    Game_Event.prototype.setMapActiveMessageShown = function(shown)
    {
        this._isMapActiveMessageShown = !!shown;
    };

    //-----------------------------------------------------------------------------
    // Sprite_Character
    //-----------------------------------------------------------------------------

    /**
     * 同一のイベントか判定
     */
    Sprite_Character.prototype.isSameEvent = function(event)
    {
        if (isNullOrUndefined(this._character) ||
            isNullOrUndefined(event) ||
            !(this._character instanceof Game_Event))
        {
            return false;
        }

        return this._character.eventId() === event.eventId();
    };


    //-----------------------------------------------------------------------------
    // Spriteset_Map
    //-----------------------------------------------------------------------------

    /**
     * 指定されたイベントに対応するキャラクタースプライトを取得
     */
    Spriteset_Map.prototype.findCharacterSpriteByEvent = function(event)
    {
        var sameSprites = this._characterSprites.filter(function(sprite)
        {
            return sprite.isSameEvent(event);
        });

        if (sameSprites.length > 0)
        {
            return sameSprites[0];
        }
        else
        {
            return null;
        }
    };


    //-----------------------------------------------------------------------------
    // Window_MapActiveMessage
    //
    // マップ上でアクティブメッセージを表示するウィンドウ
    // (スプライトでも良いが、メッセージ周りはウィンドウの方が扱いやすい)
    //-----------------------------------------------------------------------------

    function Window_MapActiveMessage()
    {
        this.initialize.apply(this, arguments);
    }

    Window_MapActiveMessage.prototype = Object.create(Window_Base.prototype);
    Window_MapActiveMessage.prototype.constructor = Window_MapActiveMessage;

    /**
     * アクティブメッセージ用スキンの事前読み込み
     */
    Window_MapActiveMessage.preloadWindowskin = function()
    {
        ImageManager.loadSystem(param.messageSkin);
    };

    Window_MapActiveMessage.prototype.initialize = function(rect)
    {

        // コンテンツサイズは内容に応じて可変なので、ウィンドウサイズは仮
       Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, 1, 1));

        this.contents = new Bitmap(this.contentsWidth(), this.contentsHeight());

        this.contents.fontSize = this.standardFontSize();

        this._balloonSprite = null;

        this.opacity         = 0;
        this.contentsOpacity = 0;
        this.initMembers();
    };

    Window_MapActiveMessage.prototype.standardFontSize = function()
    {
        return param.fontSize;
    };

    Window_MapActiveMessage.prototype.loadWindowskin = function()
    {
        // デフォルトのスキンの代わりに、アクティブメッセージ用のスキンを読み込む
        this._windowskin = ImageManager.loadSystem(param.messageSkin);
    };

    Window_MapActiveMessage.prototype.initMembers = function()
    {
        this._message         = null;
        this._pendingMessages = [];
        this._textState       = null;
        this._event           = null;
        this._characterSprite = null;
        this._targetPageIndex = 0;
        this._duration        = 0;
        this._isHiding        = false;
    };

    Window_MapActiveMessage.prototype.show = function()
    {
        Window_Base.prototype.show.call(this);
    };

    Window_MapActiveMessage.prototype.hide = function()
    {
        this._duration = 0;
        this._isHiding = true;

        Window_Base.prototype.hide.call(this);

        if (!isNullOrUndefined(this._balloonSprite))
        {
            this._balloonSprite.hide();
        }

        this.destroy();
    };

    /**
     * フェードアウト
     */
    Window_MapActiveMessage.prototype.fadeOut = function()
    {
        if (this.isFadingOut())
        {
            return;
        }
        this._isHiding = true;
        if (this.isFadingIn())
        {
            this._duration = this._initialDisplayDuration - this._duration;
        }
        else
        {
            this._duration = param.fadeFrameCount;
        }
    };

    /**
     * メッセージ表示中か
     */
    Window_MapActiveMessage.prototype.isDisplaying = function()
    {
        return this._duration > 0;
    };

    /**
     * ループ表示するか
     */
    Window_MapActiveMessage.prototype.needsLoop = function()
    {
        return this._message.needsLoop;
    };

    /**
     * 強制表示されたか
     */
    Window_MapActiveMessage.prototype.isForced = function()
    {
        return this._message.isForced;
    };

    /**
     * フェードイン中か
     */
    Window_MapActiveMessage.prototype.isFadingIn = function()
    {
        return this._duration >= this._initialDisplayDuration - param.fadeFrameCount;
    };

    /**
     * フェードアウト中か
     */
    Window_MapActiveMessage.prototype.isFadingOut = function()
    {
        return this._duration < param.fadeFrameCount;
    };

    /**
     * 消去されているか
     */
    Window_MapActiveMessage.prototype.isHiding = function ()
    {
        return this._isHiding;
    };

    /**
     * 表示中のイベントと同一イベントか
     */
    Window_MapActiveMessage.prototype.isSameEvent = function(event)
    {
        if (isNullOrUndefined(this._event))
        {
            return false;
        }

        // ページ番号まで同じ場合に同一と見なす
        if (this._event.eventId() === event.eventId() &&
            this._targetPageIndex === event.pageIndex())
        {
            return true;
        }

        return false;
    };

    /**
     * イベントが画面内にあるか判定
     */
    Window_MapActiveMessage.prototype.isEventInScreen = function()
    {
        if (isNullOrUndefined(this._event))
        {
            return false;
        }

        var x = this._event.screenX();
        var y = this._event.screenY();
        return x >= 0 && y >= 0 && x <= Graphics.boxWidth && y <= Graphics.boxHeight;
    };

    /**
     * メッセージの表示開始
     *
     * @param {String}              message     表示するメッセージ
     * @param {Sprite_Character}    sprite      表示対象のキャラクタースプライト
     */
    Window_MapActiveMessage.prototype.display = function(message, sprite)
    {
        if (isNullOrUndefined(message))
        {
            throw "'message' must not be null or undefined.";
        }

        // 表示のキャンセル
        function rollback()
        {
            this.initMembers();
            this.hide();
        }

        if (message.messages.length <= 0 || isNullOrUndefined(message.event))
        {
            rollback.call(this);
            return;
        }

        this._message = message;
        this._event = message.event;
        this._characterSprite = sprite;

        if (!this.isEventInScreen())
        {
            rollback.call(this);
            return;
        }

        this._targetPageIndex = this._event.pageIndex();

        this.initializeMessage();
        this.show();

        // 多重表示抑止のため、表示済みフラグを立てる
        this._event.setMapActiveMessageShown(true);
    };

    /**
     * メッセージの初期化
     */
    Window_MapActiveMessage.prototype.initializeMessage = function ()
    {
        this._pendingMessages = this._message.messages.slice();

        this.displayNextMessage();
    };

    /**
     * 次のメッセージを表示
     */
    Window_MapActiveMessage.prototype.displayNextMessage = function()
    {
        var message = this._pendingMessages.shift();
        if (isNullOrUndefined(message))
        {
            return false;
        }

        this._textState =
        {
            text:  this.convertEscapeCharacters(message.text),
            x: 0,
            y: 0,
            width: 24,
        };
        this._allTextWidth           = 0;
        this._initialDisplayDuration = message.duration;
        this._duration               = this._initialDisplayDuration;

        this.newPage(this._textState);
        this.updatePosition();
        this.updateOpacity();
        this.refreshBalloon();

        return true;
    };

    Window_MapActiveMessage.prototype.measureTextSize = function(text) {
        this.resetFontSettings();
        this.contents.fontSize = this.standardFontSize();
        const tempTextState = this.createTextState(text, 0, 0, this.contentsWidth());
        this.processAllText(tempTextState);

        return {
            width: tempTextState.outputWidth,
            height: tempTextState.outputHeight
        };
    };

    /**
     * 新しいページの表示
     */
    Window_MapActiveMessage.prototype.newPage = function(textState) {
        // 1. まずテキストサイズを安全に計算
        const measuredSize = this.measureTextSize(textState.text);

        // 2. ウィンドウとBitmapのサイズを更新
        this.width = measuredSize.width + this.standardPadding() * 2;
        this.height = measuredSize.height + this.standardPadding() * 2;

        // 3. contentsをリサイズし、クリア
        this.contents.resize(this.contentsWidth(), this.contentsHeight());
        this.contents.clear();

        // 4. 最後にテキストを一度だけ描画
        this.resetFontSettings();
        this.contents.fontSize = this.standardFontSize();

        const finalTextState = this.createTextState(textState.text, textState.x, textState.y, textState.width);
        this.processAllText(finalTextState);
    };

    /**
     * メッセージの表示位置を設定
     */
    Window_MapActiveMessage.prototype.updatePosition = function()
    {
        if (isNullOrUndefined(this._event))
        {
            return;
        }

        // 画面外に出る場合は消去
        if (!this.isEventInScreen())
        {
            this.hide();
            return;
        }

        // 吹き出しの枠ぶんのマージン
        var margin = this.standardPadding();

        var x = this._event.screenX() - this.width / 2;
        var y = this._event.screenY() - 2 * $gameMap.tileHeight();

        // 画面左右上下にはみ出させない
        x = Math.min(Math.max(x, margin), Graphics.boxWidth - this.width - margin);
        y = Math.min(Math.max(y, margin), Graphics.boxHeight - this.height - margin);

        this.x = x;
        this.y = y;

        if (!isNullOrUndefined(this._balloonSprite))
        {
            this._balloonSprite.x = this.x;
            this._balloonSprite.y = this.y;
        }
    };

    /**
     * 不透明度の更新
     */
    Window_MapActiveMessage.prototype.updateOpacity = function()
    {
        var opacity = 255;
        if (this.isFadingIn())
        {
            opacity = 255 * (this._initialDisplayDuration - this._duration) / param.fadeFrameCount;
        }
        else if (this.isFadingOut())
        {
            opacity = 255 * this._duration / param.fadeFrameCount;
        }

        this.opacity = opacity;
        this.contentsOpacity = opacity;
        if (!isNullOrUndefined(this._balloonSprite))
        {
            this._balloonSprite.opacity = opacity;
        }
    };

    /**
     * 吹き出しの再描画
     */
    Window_MapActiveMessage.prototype.refreshBalloon = function()
    {
        if (!isNullOrUndefined(this._balloonSprite))
        {
            this._balloonSprite.refresh();
        }
    };

    /**
     * プレイヤーと距離が離れていたら消去する
     *
     * @return {Boolean} true if hidden
     */
    Window_MapActiveMessage.prototype.hideFarMessage = function()
    {
        // 表示範囲外に出た場合は消す
        var distance = $gamePlayer.calcDistanceForMapActiveMessage(this._event);
        if (distance > this._event.getMapActiveMessageRange())
        {
            this.fadeOut();
            return true;
        }

        return false;
    };

    /**
     * プレイヤーとの距離を確認
     */
    Window_MapActiveMessage.prototype.checkPlayerDistance = function()
    {
        // 強制表示 or 消去中は距離判定しない
        if (this.isForced() ||
            this._duration <= param.fadeFrameCount)
        {
            return;
        }

        this.hideFarMessage();
    };

    Window_MapActiveMessage.prototype.update = function()
    {
        Window_Base.prototype.update.call(this);

        if (!isNullOrUndefined(this._balloonSprite))
        {
            this._balloonSprite.update();
        }

        // 表示継続中か、非表示処理中か
        const isUpdating = this.isDisplaying() || this.isFadingOut();

        if (isUpdating)
        {
            this._duration--;
            this.updateOpacity();
            this.updatePosition();
            this.checkPlayerDistance();

            // メッセージ表示時間が0になったら
            if (!this.isDisplaying())
            {
                if (this.displayNextMessage())
                {
                    // Do nothing
                }
                else if (this.needsLoop() && !this.isHiding())
                {
                    if (!this.hideFarMessage())
                    {
                        this.initializeMessage();
                    }
                }
                else
                {
                    this.hide();
                    if (this._event) {
                        this._event.setMapActiveMessageShown(false);
                    }
                }
            }
        }
    };

    /**
     * 改行の処理
     */
    Window_MapActiveMessage.prototype.processNewLine = function(textState)
    {
        this._allTextWidth = Math.max(this._allTextWidth, textState.x);

        Window_Base.prototype.processNewLine.call(this, textState);
    };

    /**
     * 改ページの処理
     */
    Window_MapActiveMessage.prototype.processNewPage = function(textState)
    {
        Window_Base.prototype.processNewPage.call(this, textState);
        if (textState.text[textState.index] === '\n')
        {
            textState.index++;
        }

        textState.y = this.contents.height;
    };

    Window_MapActiveMessage.prototype.standardPadding = function() {
        return 12;
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //-----------------------------------------------------------------------------

    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function()
    {
        _Scene_Map_createAllWindows.call(this);

        this.createActiveMessageWindow();
    };

    /**
     * アクティブメッセージウィンドウの作成
     */
    Scene_Map.prototype.createActiveMessageWindow = function()
    {
        // 追加: 既にウィンドウレイヤーが存在するかを確認
        // 既存のウィンドウレイヤーを取得
        const existingWindowLayer = this.children.find(child => child instanceof WindowLayer);

        // 既にウィンドウレイヤーが存在する場合は、それを利用する
        if (existingWindowLayer) {
            this._activeMessageWindowLayer = existingWindowLayer;
        } else {
            // 存在しない場合は、新しく作成する
            var width  = Graphics.boxWidth;
            var height = Graphics.boxHeight;
            var x = (Graphics.width  - width)  / 2;
            var y = (Graphics.height - height) / 2;
            this._activeMessageWindowLayer = new WindowLayer();
            this._activeMessageWindowLayer.x = x;
            this._activeMessageWindowLayer.y = y;
            this.addChild(this._activeMessageWindowLayer);
        }

        // _activeMessageWindowLayer が常に存在するようにする
        if (!this._activeMessageWindowLayer) {
            // 予期せぬエラーを防ぐためのフォールバック
            console.error("アクティブメッセージ用のウィンドウレイヤーが見つからないか、作成できませんでした。");
            return;
        }

        // 独自のレイヤーをメインのウィンドウレイヤーの前に挿入する
        this.setChildIndex(this._activeMessageWindowLayer, this.children.indexOf(this._windowLayer));

        Window_MapActiveMessage.preloadWindowskin();
    };

    var _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function()
    {
        _Scene_Map_update.call(this);
        this.updateActiveMessageLogic();
    };

    var _Scene_Map_stop = Scene_Map.prototype.stop;
    Scene_Map.prototype.stop = function()
    {
        _Scene_Map_stop.call(this);

        $gameTemp.clearMapActiveMessage();
    };

    var _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function()
    {
        _Scene_Map_terminate.call(this);

        this.destroyActiveMessageWindows();
    };

    /**
     * アクティブメッセージウィンドウの破棄
     */
    Scene_Map.prototype.destroyActiveMessageWindows = function()
    {
        if (!isNullOrUndefined(this._activeMessageWindowLayer)) {
            this._activeMessageWindowLayer.removeChildren();
            this.removeChild(this._activeMessageWindowLayer);
            this._activeMessageWindowLayer = null;
        }
    };

    /**
     * アクティブメッセージの表示を更新
     */
    Scene_Map.prototype.updateActiveMessageLogic = function() {
        if (!$gameSystem.isMapActiveMessageEnabled() || $gameMap.isEventRunning()) {
            // メッセージ表示を無効化
            this._activeMessageWindowLayer.children.forEach(function(child) {
                if (child instanceof Window_MapActiveMessage) {
                    child.fadeOut();
                }
            });
            return;
        }

        // 表示が完了したウィンドウを削除
        this._activeMessageWindowLayer.children.filter(function(child) {
            return (child instanceof Window_MapActiveMessage) && !child.isDisplaying();
        }).forEach(function(item) {
            this._activeMessageWindowLayer.removeChild(item);
        }, this);

        // 新規メッセージをプッシュする条件をチェック
        if ($gameMap._needsUpdateActiveMessage) {
            $gameMap._needsUpdateActiveMessage = false;

            const events = $gamePlayer.findAvailableMapActiveMessageEvents();

            events.forEach(function(event) {
                $gameTemp.pushMapActiveMessages(
                    event,
                    event.getMapActiveMessages(),
                    event.needsMapActiveMessageLoop()
                );
            });
        }

        // 予約されたメッセージを表示
        const layer = this._activeMessageWindowLayer;
        const messagesToDisplay = $gameTemp._mapActiveMessages.slice();
        $gameTemp.clearMapActiveMessage();

        messagesToDisplay.forEach(message => {
            if (layer.children.length / 2 >= param.maxMessageCount) {
                return;
            }

            if (!this.isActiveMessageDisplayed(message.event)) {
                const character = this._spriteset.findCharacterSpriteByEvent(message.event);
                if (character) {
                    const rect = new Rectangle(0, 0, 64, 64);
                    const window = new Window_MapActiveMessage(rect);
                    window.display(message, character);
                    if (this._activeMessageWindowLayer) {
                        this._activeMessageWindowLayer.addChild(window);
                    }
                }
            }
        });
    };

    /**
     * 指定されたイベントのアクティブメッセージが表示されているか判定
     */
    Scene_Map.prototype.isActiveMessageDisplayed = function(event)
    {
        var layer = this._activeMessageWindowLayer;
        for (var i = 0; i < layer.children.length; i++)
        {
            var child = layer.children[i];
            if (child instanceof Window_MapActiveMessage) {
                if (child.isDisplaying() && child.isSameEvent(event))
                {
                    return true;
                }
            }
        }
        return false;
    };

    var _Scene_Map_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
    Scene_Map.prototype.snapForBattleBackground = function()
    {
        // アクティブメッセージはキャプチャしない
        var layer = this._activeMessageWindowLayer;
        if (!isNullOrUndefined(layer))
        {
            layer.visible = false;
        }

        _Scene_Map_snapForBattleBackground.call(this);

        if (!isNullOrUndefined(layer))
        {
            layer.visible = true;
        }
    };

})();