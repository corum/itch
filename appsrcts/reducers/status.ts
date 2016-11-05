
import {handleActions} from "redux-actions";

import {IStatusState} from "../types";

import {
  IAction,
  IStatusMessagePayload,
  IDismissStatusMessagePayload,
  IEnableBonusPayload,
  IDisableBonusPayload,
} from "../constants/action-types";

const initialState = {
  messages: [],
  bonuses: {},
} as IStatusState;

export default handleActions<IStatusState, any>({
  STATUS_MESSAGE: (state: IStatusState, action: IAction<IStatusMessagePayload>) => {
    return Object.assign({}, state, {
      messages: [
        action.payload,
        ...state.messages,
      ],
    });
  },

  DISMISS_STATUS_MESSAGE: (state: IStatusState, action: IAction<IDismissStatusMessagePayload>) => {
    return Object.assign({}, state, {
      messages: state.messages.slice(1),
    });
  },

  ENABLE_BONUS: (state: IStatusState, action: IAction<IEnableBonusPayload>) => {
    const bonusName = action.payload.name;

    return Object.assign({}, state, {
      bonuses: Object.assign({}, state.bonuses, {
        [bonusName]: true,
      }),
    });
  },

  DISABLE_BONUS: (state: IStatusState, action: IAction<IDisableBonusPayload>) => {
    const bonusName = action.payload.name;

    return Object.assign({}, state, {
      bonuses: Object.assign({}, state.bonuses, {
        [bonusName]: false,
      }),
    });
  },
}, initialState);
