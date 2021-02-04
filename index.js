// Import stylesheets
import "./style.css";

// 0. Import LIFF SDK
import liff from "@line/liff";

// Body element
const body = document.getElementById("body");
// Profile elements
const pictureUrl = document.getElementById("pictureUrl");
const userId = document.getElementById("userId");
const displayName = document.getElementById("displayName");
const statusMessage = document.getElementById("statusMessage");
const email = document.getElementById("email");
// Button elements
const btnShare = document.getElementById("btnShare");

const main = async () => {
  // 2. liff.ready
  liff.ready.then(() => {
    // with liff.ready, you can get the Promise object that resolves when you run liff.init() for the first time after starting the LIFF app

    // 4. Check where LIFF was opened
    switch (liff.getOS()) {
      case "web":
        body.style.backgroundColor = "#a6c4f7";
        break;
      case "ios":
        body.style.backgroundColor = "#97ed91";
        break;
      case "android":
        body.style.backgroundColor = "#f7b7a6";
        break;
    }

    // 5. Call getUserProfile()
    if (liff.isInClient()) getUserProfile();

    // 10. Show share button
    btnShare.style.display = "block";
  });

  // 3. Try a LIFF function

  // 1. Initialize LIFF app)
  await liff.init({ liffId: "1655635109-E3bAe5pq" });
};
main();

// 6. Create getUserProfile()
const getUserProfile = async () => {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = `<b>userId: </b> + ${profile.userId}`;
  displayName.innerHTML = `<b>displayName: </b> + ${profile.displayName}`;
  statusMessage.innerHTML = `<b>statusMessage: </b> + ${profile.statusMessage}`;
  // *7. Get email
  email.innerHTML = `<b>email: </b> + ${liff.getDecodedIDToken().email}`;
};

// *8. Create shareMsg()
const shareMsg = async () => {

  if (liff.isApiAvailable("shareTargetPicker")) {
    const result = await liff.shareTargetPicker([
      {
        type: "text",
        text: "This msg was shared by LIFF hehe"
        // type: "image",
        // originalContentUrl:
        //   "https://profile.line-scdn.net/0m02c4319072514d2921635e5add8efae5670b5c3549fa",
        // previewImageUrl:
        //   "https://profile.line-scdn.net/0m02c4319072514d2921635e5add8efae5670b5c3549fa"

        // type: "flex",
        // altText: "this is a flex message",
        // contents: {
        //   type: "bubble",
        //   body: {
        //     type: "box",
        //     layout: "vertical",
        //     contents: [
        //       {
        //         type: "text",
        //         text: "hello"
        //       },
        //       {
        //         type: "text",
        //         text: "world"
        //       }
        //     ]
        //   }
        // }
      }
    ]);
    result
      ? alert("Message shared via shareTargetPicker!")
      : alert("ShareTargetPicker was cancelled by user");
  }

  liff.closeWindow();
};
// 11. Add close window

// 9. Add event listener to share button
btnShare.onclick = () => {
  shareMsg();
};
