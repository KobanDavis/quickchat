# quickchat

Quickchat is an application designed to be able to send your own quick chats in Rocket League.
Multiple phrases are able to be configured per 2 dpad inputs, as you'd normally expect in-game.

## Usage

To get started with quickchat, follow these steps:

1. Make sure that [your controller is supported](#supported-controllers).
2. From the [release](https://github.com/KobanDavis/quickchat/releases) page, download the latest version of `quickchat.exe`.
3. In rocket league, make sure to disable the 4 quick chat controller bindings. This stops double messaging.
4. Run the `.exe` file. Windows defender might stop you from running the file, so click more info & run anyway.
5. The application will search for any connected controllers, both wired and wireless, and will (attempt to) rumble when connected.
6. Run rocket league. This will enable the bindings to work.

From here the D-Pad inputs will work from anywhere and input text wherever it can, so try not to navigate menu screens with the dpad.

### Custom Phrases

To get started with your own phrases, follow these steps:

1. Download the `empty.json` file from the releases page.
2. Open the file in a text editor, and add phrases into the empty array like so:
```js
{
  "up": {
    "up": ["This phrase will send when I press up & up on the D-Pad!"]
    // ...
  },
  // ...
}
```
3. Ensure the file is saved in the same folder as `quickchat.exe`.
4. Run `quickchat.exe`, and select the preset from the prompt.

## Build

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

## Supported Controllers

Currently, only the following controllers are supported:

- DualSense (PS5)
- DualShock4 (PS4)

Contributions to this repository are welcome and encouraged!
