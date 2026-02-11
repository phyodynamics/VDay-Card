export type Lang = "my" | "en";

export const translations = {
  nav: {
    home: { my: "ပင်မ", en: "Home" },
    creator: { my: "ဖန်တီးသူ", en: "Creator" },
    create: { my: "ဖန်တီးမယ်", en: "Create Now" },
  },
  home: {
    heroTitle1: { my: "Valentine's Day", en: "Valentine's Day" },
    heroTitle2: {
      my: "Card လေးတွေ ဖန်တီးလိုက်ပါ",
      en: "Create Your Card",
    },
    heroSubtitle: {
      my: "ချစ်သူအတွက် အထူးအမှတ်တရ Card လေးတစ်ခုကို ကိုယ်တိုင်ဒီဇိုင်းဆွဲပြီး Surprise လုပ်လိုက်ပါ",
      en: "Design a special card for your loved one and share it instantly",
    },
    ctaButton: { my: "စတင်ဖန်တီးမယ်", en: "Create Now" },
    aboutTitle: { my: "ကျွန်တော်တို့ Website", en: "About This Website" },
    aboutDesc: {
      my: "Valentine's Day အထူးအခါသမယမှာ ချစ်သူကို ပြောချင်တဲ့ ရင်ထဲကစကားလေးတွေ၊ အမှတ်တရ ပုံရိပ်လေးတွေကို Card တစ်ခုအနေနဲ့ ဖန်တီးပြီး လက်ဆောင်ပေးလိုက်ပါ။ Sticker ချစ်စဖွယ်လေးတွေ၊ ဓာတ်ပုံလှလှလေးတွေနဲ့ စိတ်ကြိုက်ပုံဖော်နိုင်ပါတယ်။",
      en: "Easily create beautiful Valentine's Day cards. Add hearts, flowers, custom texts and photos, then share with your loved one via a single link.",
    },
    stepsTitle: {
      my: "လွယ်ကူတဲ့ အဆင့် ၃ ဆင့်နဲ့ ဖန်တီးလိုက်ပါ",
      en: "Create in 3 Easy Steps",
    },
    step1Title: { my: "Theme ရွေးချယ်ပါ", en: "Choose Theme" },
    step1Desc: {
      my: "ကြိုက်နှစ်သက်ရာ Theme တစ်ခုကို ရွေးချယ်လိုက်ပါ",
      en: "Select your favorite card theme and add beautiful elements",
    },
    step2Title: {
      my: "စာသားနဲ့ ဓာတ်ပုံ ထည့်ပါ",
      en: "Add Text & Photos",
    },
    step2Desc: {
      my: "ရင်ထဲကစကားလေးတွေ ရေးပြီး အမှတ်တရဓာတ်ပုံလေးတွေ ထည့်သွင်းလိုက်ပါ",
      en: "Write your love messages and add special photos",
    },
    step3Title: { my: "Link ရယူပြီး မျှဝေပါ", en: "Generate & Share" },
    step3Desc: {
      my: "QR Code သို့မဟုတ် Link ကိုရယူပြီး ချစ်သူဆီ ပို့ကာ Surprise လုပ်လိုက်ပါ",
      en: "Generate a QR code and link, then send it to your loved one",
    },
  },
  creator: {
    heroTitle: { my: "ဖန်တီးသူ", en: "Meet the Creator" },
    heroSubtitle: {
      my: "ဒီ website ကို ဖန်တီးတည်ဆောက်ထားသူ",
      en: "The person behind this website",
    },
    name: { my: "Phyo Zin Ko", en: "Phyo Zin Ko" },
    role: { my: "Developer & Designer", en: "Developer & Designer" },
    socialTitle: { my: "ဆက်သွယ်ရန်", en: "Connect With Me" },
  },
  editor: {
    title: { my: "Card ဖန်တီးမယ်", en: "Design Your Card" },
    themes: { my: "Theme များ", en: "Themes" },
    elements: { my: "Sticker များ", en: "Elements" },
    hearts: { my: "နှလုံးသား", en: "Hearts" },
    flowers: { my: "ပန်းပွင့်", en: "Flowers" },
    bouquets: { my: "လက်ဆောင်", en: "Bouquets" },
    text: { my: "စာသား", en: "Text" },
    addText: { my: "စာသား ထည့်မယ်", en: "Add Text" },
    mainMessage: { my: "ရင်ထဲက စကား", en: "Main Message" },
    messagePlaceholder: {
      my: "ချစ်သူကို ပြောချင်တဲ့စကားလေးတွေ ရေးလိုက်ပါ...",
      en: "Write your love message...",
    },
    uploadImages: { my: "ဓာတ်ပုံ ထည့်မယ်", en: "Upload Images" },
    uploadLimit: {
      my: "(အများဆုံး ၅ ပုံ၊ တစ်ပုံ 5MB)",
      en: "(Max 5 images, 5MB each)",
    },
    generateLink: { my: "Link ထုတ်ယူမယ်", en: "Generate Link" },
    generating: { my: "ဖန်တီးနေပါတယ်...", en: "Generating..." },
    shareTitle: { my: "Card ကို မျှဝေပါ", en: "Share Your Card" },
    copyLink: { my: "Link ကူးယူမယ်", en: "Copy Link" },
    copied: { my: "ကူးယူပြီးပါပြီ!", en: "Copied!" },
    qrCode: { my: "QR Code", en: "QR Code" },
    longText: {
      my: "သင်ဖန်တီးထားတဲ့ Valentine's Card လေးကို Link မှတဆင့် သို့မဟုတ် QR Code ကို Scan ဖတ်ပြီး ကြည့်ရှုနိုင်ပါတယ်။ ချစ်သူဆီကို ဒီ Link လေး ပို့ပြီး Surprise လုပ်လိုက်ပါ။ Card ထဲမှာ သင့်ရဲ့ မေတ္တာနဲ့ အမှတ်တရတွေ အပြည့်ရှိနေမှာပါ။",
      en: "Share your Valentine's Day Card with a single link. Others can also scan the QR code to view your creation. When your loved one opens the link, they'll see the beautiful card you've designed with all your love and care. Express your deepest feelings this Valentine's Day through this special card.",
    },
    deleteElement: { my: "ဖျက်မယ်", en: "Delete" },
    fontSize: { my: "စာလုံးအရွယ်အစား", en: "Font Size" },
    fontColor: { my: "စာလုံးအရောင်", en: "Font Color" },
    canvas: { my: "Card မျက်နှာပြင်", en: "Card Canvas" },
  },
  card: {
    madeWith: { my: "ဖန်တီးသူ -", en: "Made with" },
    createOwn: {
      my: "ကိုယ်ပိုင် Card ဖန်တီးမယ်",
      en: "Create Your Own Card",
    },
    loading: { my: "ခဏစောင့်ပါ...", en: "Loading..." },
    notFound: { my: "Card ရှာမတွေ့ပါ", en: "Card Not Found" },
  },
  guide: {
    step1: { my: "👆 Theme တစ်ခုရွေးလိုက်ပါ", en: "👆 Select a theme" },
    step2: {
      my: "🎨 Sticker ချစ်စဖွယ်လေးတွေ ထည့်လိုက်ပါ",
      en: "🎨 Add elements to your card",
    },
    step3: {
      my: "✍️ ရင်ထဲကစကားလေးတွေ ရေးလိုက်ပါ",
      en: "✍️ Write your message",
    },
    step4: {
      my: "📷 အမှတ်တရ ဓာတ်ပုံလေးတွေ ထည့်လိုက်ပါ",
      en: "📷 Upload your photos",
    },
    step5: {
      my: "🔗 Link ယူပြီး ချစ်သူဆီ ပို့လိုက်ပါ!",
      en: "🔗 Generate link and share!",
    },
    skip: { my: "ကျော်မယ်", en: "Skip" },
    next: { my: "ဆက်သွားမယ်", en: "Next" },
    finish: { my: "ပြီးပါပြီ", en: "Finish" },
  },
  langToggle: { my: "EN", en: "MY" },
  share: {
    title: { my: "Card ဖန်တီးပြီးပါပြီ! 🎉", en: "Card Created! 🎉" },
    subtitle: {
      my: "QR Code ကို Scan ဖတ်ပြီး သို့မဟုတ် Link ကိုကူးယူပြီး ချစ်သူဆီ ပို့လိုက်ပါ",
      en: "Scan the QR code or copy the link to share with your loved one",
    },
    scanHint: {
      my: "QR Code ကို Scan ဖတ်ပါ",
      en: "Scan QR Code to view card",
    },
    copy: { my: "Link ကူးမယ်", en: "Copy Link" },
    copied: { my: "ကူးပြီးပါပြီ! ✓", en: "Copied! ✓" },
    openLink: { my: "ဖွင့်ကြည့်မယ်", en: "Open Link" },
    createAnother: {
      my: "← Card အသစ် ထပ်ဖန်တီးမယ်",
      en: "← Create Another Card",
    },
  },
  footer: {
    text: {
      my: "❤️ ချစ်ခြင်းမေတ္တာဖြင့် ဖန်တီးထားပါသည်",
      en: "❤️ Made with love",
    },
    copyright: {
      my: "© 2026 Valentine Card Creator",
      en: "© 2026 Valentine Card Creator",
    },
  },
} as const;

export type TranslationKey = typeof translations;
