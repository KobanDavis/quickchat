# quickchat

Quickchat is an application designed to be able to send your own quick chats in Rocket League.
Multiple phrases are able to be configured per 2 dpad inputs, as you'd normally expect in-game. These phrases can be configured by creating a `phrases.json` file in the same directory as the `.exe`.

# Usage

1. From the release page, download `quickchat.exe`.
2. In rocket league, make sure to disable quick chat controller bindings. This stops double messaging.
3. Run the `.exe` file. Windows defender might stop you from running the file, so click more info & run anyway.
4. The application will search for any connected dualsense controllers, both wired and wireless, and will rumble when connected.

From here the dpad inputs will work from anywhere and input text wherever it can, so try not to navigate menu screens with the dpad, or just run the exe when you're in game.

# Build

Clone the repository and install dependencies:

```sh
$ git clone git@github.com:kobandavis/quickchat.git
$ cd quickchat
$ yarn install
```

Transpile the TypeScript code to JavaScript:

```sh
$ yarn transpile
```

Build the code into one file and then package to `.exe`:

```sh
$ yarn build && yarn package
```

# Limitations

Currently only dualsense (PS5) controllers and DualShock (PS4) controllers are supported. This is because this is the only controllers that have been contributed.
Make sure to unbind the Rocket League quickchat keybindings.
