# 細かい動作は手動で確認すること。
# →テストコードを書く時間がもったいないので

Feature: Pages.Index
ログインページ(仮)の機能テスト

    # 各ページで共通で確認すること。
    Background: ログインページ(仮)にアクセスする
        Then "/Index"にアクセスする

    # TODO: あとで作る
    # Scenario: アプリケーション名表示確認
    #     Given アプリケーション名が"ウェルネスアプリ(仮)"となっている
    #     Then クリックしたら、"/Index"に遷移する

    Scenario: 表示確認
        Then タイトルに"ログイン"がある
        Then "エンドユーザ"ボタンがある
    Scenario: 表示確認
        Then "運営者"ボタンがある
    # Scenario: フッターの表示確認

    # 各ページの固有部で確認すること。
    # 初期表示確認、挙動確認、

    # 位置関係の確認,　表示確認
    # Scenario: 

    Scenario: "エンドユーザ"ボタン押下
        When "エンドユーザ"ボタンをクリックする
        Then "/ForEnduser"に遷移する
        
    Scenario: "運営者"ボタン押下
        When "運営者"ボタンをクリックする
        Then "/ForManager"に遷移する
