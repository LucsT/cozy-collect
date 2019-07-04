/* eslint-env jest */

import connections, {
  enqueueConnection,
  getConnectionsByKonnector,
  getQueue,
  purgeQueue
} from '../'

describe('Connections Duck', () => {
  describe('Action creators', () => {
    describe('enqueueConnection', () => {
      it.skip('marks account as queued', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {}
          }
        }
        const konnector = { slug: 'testprovider' }
        const account = { _id: '17375ac5a59e4d6585fc7d1e1c75ec74' }

        const result = connections(state, enqueueConnection(konnector, account))

        expect(result).toMatchSnapshot()
      })
    })

    describe('purgeQueue', () => {
      it.skip('marks all accounts as not queued', () => {
        const state = {
          testprovider: {
            '17375ac5a59e4d6585fc7d1e1c75ec74': {},
            '63c670ea9d7b11e7b5888c88b1c12d46': {
              isEnqueued: true
            }
          },
          anotherprovider: {
            '768ccdaa9d7b11e7869aae88b1c12d46': {
              isEnqueued: true
            }
          }
        }

        const result = connections(state, purgeQueue())

        expect(result).toMatchSnapshot()
      })
    })
  })

  describe('Selectors', () => {
    describe('getConnectionsByKonnector', () => {
      it('returns expected connections', () => {
        const state = {
          konnectors: {
            provider: {
              triggers: {
                '81a548fca81455ec2c2644dd55009990': {
                  account: '81a548fca81455ec2c2644dd55008b52',
                  error: 'LOGIN_FAILED',
                  hasError: true,
                  isConnected: false,
                  isRunning: false
                },
                '63c670ea9d7b11e7b5888c88b1c12d46': {
                  account: '17375ac5a59e4d6585fc7d1e1c75ec74',
                  error: null,
                  hasError: false,
                  isConnected: true,
                  isRunning: true
                }
              }
            }
          }
        }

        const validKonnectors = ['provider']
        const validAccounts = ['81a548fca81455ec2c2644dd55008b52']

        expect(
          getConnectionsByKonnector(
            state,
            'provider',
            validAccounts,
            validKonnectors
          )
        ).toMatchSnapshot()
      })
    })

    describe('getQueue', () => {
      it('returns one queued connection per queued account', () => {
        const state = {
          data: {
            testprovider: {
              '17375ac5a59e4d6585fc7d1e1c75ec74': {},
              '63c670ea9d7b11e7b5888c88b1c12d46': {
                isRunning: true,
                isEnqueued: true
              },
              '768ccdaa9d7b11e7869aae88b1c12d46': {
                isEnqueued: true,
                error: {
                  message: 'test error'
                }
              }
            }
          }
        }

        const konnectors = {
          testprovider: {
            name: 'Test Provider',
            slug: 'testprovider'
          }
        }

        const result = getQueue(state, konnectors)

        expect(result).toMatchSnapshot()
      })
    })
  })
})
