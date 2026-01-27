// =======================================================
// UI TEXT (FIXED)
// 本ファイルの文言は「変更不可」です。
// 仕様: 文言固定・ロジック固定のMVP要件に従います。
// =======================================================

export const UI_TEXT = {
  appName: "判断支援ツール（MVP）",

  nav: {
    newDecision: "新規判定",
    logs: "判定履歴",
  },

  triState: {
    YES: "Yes",
    NO: "No",
    UNKNOWN: "Unknown",
  },

  pages: {
    new: {
      title: "判定入力",
      description:
        "以下の質問に回答してください。回答は Yes / No / Unknown のいずれかを選択します。",
      sectionTitle: "判定項目",
      submit: "判定する",
      validationError: "未回答の項目があります。すべての項目に回答してください。",
    },

    result: {
      title: "判定結果",
      resultLabel: "結果",
      createdAtLabel: "判定日時",

      EXIT: {
        heading: "EXIT",
        description:
          "現時点では実行不可です。前提を整えるか、条件を見直してください。",
      },
      HOLD: {
        heading: "HOLD",
        description:
          "保留です。必要情報の確認や前提の整理が完了してから再判定してください。",
        holdUntilLabel: "保留期限",
        expiredBadge: "期限切れ",
        expiredMessage: "期限切れです。再判定してください。",
      },
      PROCEEDABLE: {
        heading: "PROCEEDABLE",
        description:
          "実行可能です。必要な前提が揃っている前提で、次のステップに進めます。",
      },

      actions: {
        viewLogs: "判定履歴を見る",
        newDecision: "もう一度判定する",
        viewDetail: "この判定の詳細を見る",
      },
    },

    logs: {
      title: "判定履歴",
      description: "過去の判定結果を一覧できます。",
      empty: "判定履歴はありません。",

      table: {
        createdAt: "判定日時",
        result: "結果",
        holdUntil: "保留期限",
        status: "状態",
        action: "操作",
      },

      status: {
        normal: "正常",
        expired: "期限切れ",
      },

      actions: {
        openDetail: "詳細",
      },
    },

    logDetail: {
      title: "判定履歴詳細",
      description: "判定時の回答内容と結果を確認できます。",

      fields: {
        createdAt: "判定日時",
        result: "結果",
        holdUntil: "保留期限",
        answers: "回答内容",
      },

      actions: {
        backToLogs: "一覧へ戻る",
        newDecision: "新規判定へ",
      },
    },
  },
} as const;