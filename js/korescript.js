const assets = {
  BOT_ICON:
    "https://dlnwzkim0wron.cloudfront.net/f-bb0c0f23-5016-5248-9865-bcd57ede52ae.png",
};
function initialRunScript() {
  var chatConfig = KoreChatSDK.chatConfig;
  var chatWindow = KoreChatSDK.chatWindow;
  var jquerySelector = chatWindow.prototype.$;
  chatConfig.multiPageApp.enable = true;
  chatConfig.loadHistory = false;
  chatConfig.history.paginatedScroll.enable = false;
  var userMessages = [];
  let password = "";
  let username = localStorage?.getItem("username");
  let givenName = localStorage?.getItem("username");
  let headerElement = document.querySelector(".header-username");
  if (headerElement && username !== null) {
    document.querySelector(".header-username").textContent = `Hi ${username}`;
  }

  var WebKitSTTPlugin = WebKitSTTPluginSDK.WebKitSTT;

  var chatWindowInstance = new chatWindow();
  var botOptions = chatConfig.botOptions;
  var options = {
    lang: "en-US",
  };

  botOptions.botInfo = {
    name: "Feature Bot",
    _id: "st-bd0d800a-0cbd-5d49-8b6c-3f5148d50825",
  };

  botOptions.clientId = "cs-376daf2a-fbbf-5f2f-bd0a-302334c8a184";
  botOptions.clientSecret = "SeyJe/dUpskhKYwE5YFT6MyAAYbRBOo2lw6+k+ihyD8=";
  botOptions.JWTUrl = "https://demo.kore.net/users/sts";

  chatWindowInstance.installPlugin(new WebKitSTTPlugin(options));

  chatWindowInstance.on("viewInit", (chatElement) => {
    const botElement = document.querySelector(".minimized");
    document.querySelector(".historyLoadingDiv")?.remove();
    document.querySelector(".trainWarningDiv")?.remove();

    //removing bot icon if it exists in the dom
    if (botElement) {
      botElement.style.display = "none";
    }
    // **************************************

    // removing the scrolling comments of bot icon hover
    document.querySelector(".minimized-title").remove();
    // ****************************************************

    // overriding the existing kore header
    const headerEl = document.querySelector(".kore-chat-header");

    headerEl.innerHTML = `<div class='header-container'>
                <img src="images/Avatar TINA.png" alt="user_image" height="90px" width="90px" class="userImage" />
                <div class="header-titlesContainer">
                    <div class="header-username"></div>
                    <div class="header-greetingMsg">You're talking to </div>
                    <div class="botTitleContainer">
                        <span class="botName">Innovative Medicine Training</span>
                        <span class="chatbot-header-text">Chatbot</span>
                    </div>
                </div>
            </div>
            <div class="chat-box-controls"> 
                <button class="reload-btn" title="Reconnect"></button>
                <button>
                    <i class="fa-solid fa-bars header-menu-btn"></i>
                </button>
                <div class="kore-header-shadow"></div>
            </div>
            <div id="sideDrawer" class="side-drawer">
                <div class="sidedrawer-close-btn"><i class="fa-solid fa-xmark close-btn-fa"></i></div>
                <div class="side-drawer-content">
                    <div class="logout-user-icon">User</div>
                    <div class="logout-side-bar-user">SSamine1</div>
                    <button class="koreExitChatButton logout-btn">Log Out</button>
                </div>
            </div>`;

    // **************************************

    // logout sidebar with functionality
    function openSideDrawer() {
      document.querySelector("#sideDrawer").style.width = "300px";
    }

    function closeSideDrawer() {
      document.querySelector("#sideDrawer").style.width = "0";
    }

    // logout functionality ====> displaying login page, hiding kore chatbot classes
    function LogoutClick() {
      closeSideDrawer();
      chatWindowInstance.destroy();
      localStorage.clear();
      document
        .querySelector(".login-container")
        ?.classList.remove("hideLoginContainer");
      //hiding chat body
      document.querySelector(".kore-chat-body").classList.add("hideElement");
      //hiding chat header
      document.querySelector(".kore-chat-header").classList.add("hideElement");
      //hiding chat header line
      document
        .querySelector(".kore-header-shadow")
        .classList.add("hideLoginContainer");
      let loginContainerEl = jquerySelector(".login-container");
      if (loginContainerEl) {
        jquerySelector.template("loginContainer", loginContainer);
        jquerySelector.tmpl("loginContainer").prependTo(".kore-chat-window");
      }
      // localStorage.setItem("isAuthenticated", false);
      //removing session from local storage
      // localStorage.removeItem("kr-cw-session", new Date());
      //added reload to have updated local storage changes
      window.location.reload();
    }

    // const handleLogin = async () => {

    //   if (document.getElementById("username").value.endsWith("@its.jnj.com")) {
    //     username = document.getElementById("username").value.slice(0, -12);
    //   } else {
    //     username = document.getElementById("username").value;
    //   }

    //   password = document.getElementById("password").value;

    //   const response = await fetch('https://iadevprojects.jnjux.com/user/logon/ldap/jjldap', {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ "username": username, "password": password })
    //   });

    //   if (response.ok === true || response.status === 200) {
    //     jquerySelector(".login-container").hide();
    //     jquerySelector(".welcome-container").show();
    //   } else {
    //     jquerySelector(".error-container").removeClass("hideElement")
    //     setTimeout(() => {
    //       jquerySelector(".error-container").addClass("hideElement")
    //     }, 2000);
    //   }

    // }

    const handleLogin = async () => {
      const usernameField = document.getElementById("username");
      const passwordField = document.getElementById("password");
      const errorContainer = document.querySelector(".error-container");
      const loginBtn = document.getElementById("loginBtn");

      // Check if fields are empty
      if (
        usernameField.value.trim() === "" ||
        passwordField.value.trim() === ""
      ) {
        errorContainer.textContent = "Username and Password are required";
        errorContainer.classList.remove("hideElement");
        setTimeout(() => {
          errorContainer.classList.add("hideElement");
        }, 2000);
        return;
      }

      if (usernameField.value.endsWith("@its.jnj.com")) {
        username = usernameField?.value?.slice(0, -12);
      } else {
        username = usernameField?.value;
      }

      const password = passwordField.value;

      loginBtn.innerHTML = '<span class="loader"></span> Logging in...';
      loginBtn.disabled = true;
      try {
        const response = await fetch(
          "https://iadevprojects.jnjux.com/user/logon/ldap/jjldap",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
          }
        );

        if (response.ok === true || response.status === 200) {
          jquerySelector(".login-container").hide();
          jquerySelector(".welcome-container").show();
        } else {
          errorContainer.textContent = "Invalid credentials";
          errorContainer.classList.remove("hideElement");
          setTimeout(() => {
            errorContainer.classList.add("hideElement");
          }, 2000);
        }
      } catch (error) {
        errorContainer.textContent = "An error occurred. Please try again.";
        errorContainer.classList.remove("hideElement");
        setTimeout(() => {
          errorContainer.classList.add("hideElement");
        }, 2000);
      } finally {
        // Remove loader and re-enable button
        loginBtn.innerHTML = "Submit";
        loginBtn.disabled = false;
      }
    };

    // login page
    let loginContainer = `
            <div class='login-container'>
                <div>
                    <div> <img src="https://dlnwzkim0wron.cloudfront.net/f-bb0c0f23-5016-5248-9865-bcd57ede52ae.png" height="120px" width="120px"/>  </div>
                </div>
                <div>
                    <label for='username' class='login-labels'>Username</label>
                    <input id='username' type="text" placeholder="Username" class="login-input-field"/>
                </div>
                <div>
                    <label for='password' class='login-labels'>Password</label>
                    <input id='password' type="password" placeholder="Password" class="login-input-field"/>
                </div>
                <button id='loginBtn' class="login-submit-btn">Submit</button>

                <div class="error-container hideElement">
                Invalid credentials
                </div>
            </div>`;

    if (localStorage.getItem("kr-cw-state") !== "open") {
      jquerySelector.template("loginContainer", loginContainer);
      jquerySelector.tmpl("loginContainer").prependTo(".kore-chat-window");
      document
        .querySelector(".kore-header-shadow")
        .classList.add("hideLoginContainer");
      document.querySelector(".kore-chat-header").classList.add("hideElement");
      // login button functionality
      document
        .querySelector("#loginBtn")
        .addEventListener("click", handleLogin);
    }

    document.querySelector("#username")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    });

    document.querySelector("#password")?.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        handleLogin();
      }
    });

    //welcome screen
    let welcomeContainerEl = `
            <div class='welcome-container'>
                <div class='welcome-text-buttons'>
                <div class="welcome-text">
                  <div class='welcome-header'> <img src="https://dlnwzkim0wron.cloudfront.net/f-bb0c0f23-5016-5248-9865-bcd57ede52ae.png" height="70px" width="70px"/> knoVA </div>
                  <div> Innovative medicine</div>
                </div>
                <div class='welcome-buttons'>
                    <select value="En" style="width:230px" class='language-dropdown'>
                         <option value="En">
                            English
                        </option>
                    </select>
                    <button class="start-chat-btn" >Start chat 
                    <span class="start-chat-arrow-container">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <rect width="25" height="25" fill="url(#pattern0_201_49)"/>
                            <defs>
                            <pattern id="pattern0_201_49" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlink:href="#image0_201_49" transform="scale(0.0111111)"/>
                            </pattern>
                            <image id="image0_201_49" width="90" height="90" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPUlEQVR4nO3cu88MURjH8S+FW+NSUIjEtaQTf4BIJPwFolQKb0tH5V/QqkkotAq8xJsgUVJRuhUuocAjE7vJRpbdmT2z5+ye7yd56nnOLzObk5nnLEiSJEmSJEmSJEnS8jkEHMjdxDLbBTwEYlCrwP7cTS2jWyMhD+sjcCp3Y8vmy5igm/oJXAHW525wWcSEugfszN1kDUEH8AY4lrvRGoIO4DtwMXezNQQdg7oBbMnddA1BB/AM2Je78RqCDuA9cDJ38zUEHcAv4JpbwP6DHtZdYPuU16tWJKrXwNHci6kh6AC+AedyL6iGoGNkC7g598JqCDqAp8DevpvfBKwAa8DXHhcThddb4HhfIe8BXhSwyCikfgCXgHWp72RDZmzgt4GtqYJeKeAOioLrJXA4RdBrBSwmCq/mQ8OZWYP+XMBCYkHqOrCha9C5m48Fq9WuX29yNx4LWM0XeINmPmEf9I5mLkG3HtzJ/RjGApY/HfQf8uPBpFRrbu+Yz/buSQGPYhRezUu2s8zoQgELiYLrFXCEBDYCzwtYUBRYd4BtJLTbsPn7Nenl1K9Jh5of+fPAI+BTAXdTZKp3wIk+Al5E0eOnLKeZRvQRsh9nx0gZsOMG/5EqZAdoJkg1ErZj0oVqFzOUQ44tdA35g2O77XQdRPcsYktdtm4erehg2oA9LDSjaUL2+FsCk0L2QGfPR5SbrdtVz6ekc/Mfh+5PJ7yG+DMp9GAk5Pv+b0e/miEWX2tKkiRJkiRJkiRJohS/AUigwBKbL7PpAAAAAElFTkSuQmCC"/>
                            </defs>
                        </svg>
                    </span>
                    </button>
                </div>
                <div class='welcome-bottom-text'>
                    This chat may be analysed for training, quality <br> and compliance purposes. To learn more<br>about your privacy rights click here.
                </div>
                </div>
                <div class='welcome-icon-text'>
                    <div class='welcome-img'>
                    <img src='../images/Avatar TINA.png' class='bot-image' />
                    </div>
                    <div>Hi, I’m TINA - Your Innovative Medicine Training Chatbot.</div>
                </div>
            </div>
            `;

    jquerySelector.template("welcomeContainer", welcomeContainerEl);
    jquerySelector.tmpl("welcomeContainer").prependTo(".kore-chat-window");
    jquerySelector(".welcome-container").hide();

    // footer element
    const footerEl = chatElement.chatEle.find(".footerContainer");

    const chatInputField = jquerySelector(".chatInputBox");
    let placeHolder = "Type your message";
    chatInputField.attr("placeholder", placeHolder);

    let menuIcon = `
             <div class="footerOuterContainer"></div>
       <div class="botFooterContainer">
             <div class="kore-chat-input-btn-container">
                 <button class="menu-item footer-menu-btn" type="button">Send Feedback</button>
                 <button class="footer-menu-icon">
                     <i class="fa-solid fa-bars footer-btn"></i>
                 </button>
    `;

    let sentIcon = `
      <div>
        <svg class="webchat__send-icon webchat--css-ynfdo-varv44 sendIcon" height="28" viewBox="0 0 45.7 33.8" width="28"><path clip-rule="evenodd" d="M8.55 25.25l21.67-7.25H11zm2.41-9.47h19.26l-21.67-7.23zm-6 13l4-11.9L5 5l35.7 11.9z"></path></svg>
      </div>
    `;

    footerEl.prepend(menuIcon);
    footerEl.append(sentIcon);

    footerEl.on("click", ".sendIcon", function () {
      const inputField = jquerySelector(".chatInputBox");
      const messageText = inputField.text().trim();
      if (messageText.length && messageText !== "") {
        chatWindowInstance.sendMessage(messageText);
        inputField.text("");
      }
    });

    function openFeedbackContainer() {
      document.querySelector(".footer-menu-btn").style.display = "none";
      window.location.href =
        "https://forms.office.com/pages/responsepage.aspx?id=M0vJOjWRIUiVAur9plkqNQH_VMWkmlNGlKDP8J-WlMBUQUc4TDBCWDFGMFdMMUE3QTYzWVRMSk5LNS4u";
    }

    document
      .querySelector(".footer-menu-icon")
      .addEventListener("click", () => {
        console.log(
          typeof document.querySelector(".footer-menu-btn").style.display
        );
        if (
          document.querySelector(".footer-menu-btn").style.display == "" ||
          document.querySelector(".footer-menu-btn").style.display == "none"
        ) {
          document.querySelector(".footer-menu-btn").style.display = "block";
          document.querySelector(".footer-menu-btn").style.width = "144px";
          document.querySelector(".footer-menu-btn").style.marginBottom =
            "25px";
        } else if (
          document.querySelector(".footer-menu-btn").style.display == "block"
        ) {
          document.querySelector(".footer-menu-btn").style.display = "none";
        }
      });

    document
      .querySelector(".footer-menu-btn")
      .addEventListener("click", openFeedbackContainer);

    if (document.querySelector(".start-chat-btn")) {
      document
        .querySelector(".start-chat-btn")
        .addEventListener("click", async function () {
          jquerySelector(".welcome-container").hide();

          var chatFooter = document.querySelector(".kore-chat-footer");
          localStorage.setItem("username", username);
          document
            .querySelector(".login-container")
            .classList.add("hideLoginContainer");
          document
            .querySelector(".kore-header-shadow")
            .classList.remove("hideLoginContainer");
          document
            .querySelector(".kore-chat-window")
            .classList.remove("hideElement");
          document.querySelector(".minimized").click();
          document.querySelector(
            ".header-username"
          ).textContent = `Hi ${username}`;
          document.querySelector(".logout-side-bar-user").textContent =
            username;
          document
            .querySelector(".kore-chat-header")
            .classList.remove("hideElement");
          document
            .querySelector(".kore-chat-body")
            .classList.remove("hideElement");
          document
            .querySelector(".header-container")
            .classList.remove("hideElement");
          document
            .querySelector(".kore-chat-footer")
            .classList.remove("disableFooter");

          document.getElementById("username").value = "";
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("kr-cw-session", new Date());
        });
    }

    document
      .querySelector(".header-menu-btn")
      .addEventListener("click", openSideDrawer);
    document
      .querySelector(".sidedrawer-close-btn")
      .addEventListener("click", closeSideDrawer);
    document
      .querySelector(".logout-btn")
      .addEventListener("click", LogoutClick);

    document.addEventListener("DOMContentLoaded", function () {
      if (localStorage.getItem("kr-cw-state") === "open") {
        document.querySelector(
          ".header-username"
        ).textContent = `Hi ${username}`;
        document.querySelector(".logout-side-bar-user").textContent = username;
        document.querySelector(".reload-btn").click();
      } else {
        document
          .querySelector(".login-container")
          .classList.remove("hideLoginContainer");
      }
    });

    // chatwindowinstance viewinit ends here==================================================================================>
  });

  function koreGenerateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
      d += performance.now();
    }
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  const generateUuid = function () {
    return new Promise((resolve, reject) => {
      const existingUserIdentity = localStorage.getItem("kr-sw-uid");

      if (existingUserIdentity) {
        botOptions.userIdentity = existingUserIdentity;
        resolve();
      } else {
        if (chatWindowInstance.config.multiPageApp.enable) {
          let _userIdentityStore = localStorage.getItem("kr-cw-uid");
          if (_userIdentityStore) {
            botOptions.userIdentity = koreGenerateUUID();
            localStorage.removeItem("kr-cw-uid");
            resolve();
          } else {
            botOptions.userIdentity = koreGenerateUUID();
            localStorage.removeItem("kr-cw-uid");
            localStorage.removeItem("kr-cw-state");
            resolve();
          }
        } else {
          botOptions.userIdentity = koreGenerateUUID();
          localStorage.setItem("kr-sw-uid", botOptions.userIdentity);
          resolve();
        }
      }
    });
  };

  generateUuid();

  window.customChatInstance = chatWindowInstance;
  chatWindowInstance.show(chatConfig);
}
initialRunScript();
