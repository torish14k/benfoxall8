/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  fileio, FILE_CONTENT, prepareFile, nextFileName, isIntNum,
  describe, it, expect,
} from '../../Common';

describe('fileio_ftruncate', function () {

  /**
   * @tc.number SUB_DF_FileIO_FtruncateAsync_0000
   * @tc.name fileio_test_ftruncate_async_000
   * @tc.desc Test ftruncateAsync() interfaces.
   */
  it('fileio_test_ftruncate_async_000', 0, async function (done) {
    let fpath = nextFileName('fileio_test_ftruncate_async_000');
    expect(prepareFile(fpath, FILE_CONTENT)).assertTrue();
    let fd = fileio.openSync(fpath, 0o2);
    expect(isIntNum(fd)).assertTrue();
    let truncateLen = 5;
    try {
      fileio.ftruncate(fd, truncateLen, async function (err) {
        expect(err == null).assertTrue();
        let len = fileio.readSync(fd, new ArrayBuffer(4096));
        expect(len == truncateLen).assertTrue();
        expect(fileio.closeSync(fd) == null).assertTrue();
        expect(fileio.unlinkSync(fpath) == null).assertTrue();
        done();
      })
    } catch (e) {
      console.log('fileio_test_ftruncate_async_000 has failed for ' + e);
      expect(null).assertFail();
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_FtruncateAsync_0010
   * @tc.name fileio_test_ftruncate_async_001
   * @tc.desc Test ftruncateAsync() interfaces.
   */
  it('fileio_test_ftruncate_async_001', 0, async function (done) {
    let fpath = nextFileName('fileio_test_ftruncate_async_001');
    expect(prepareFile(fpath, 'truncate')).assertTrue();
    let fd = fileio.openSync(fpath, 0o2);
    expect(isIntNum(fd)).assertTrue();
    let truncateLen = 2;
    try {
      fileio.ftruncate(fd, truncateLen)
        .then(function (err) {
          expect(err == null).assertTrue();
          let len = fileio.readSync(fd, new ArrayBuffer(4096));
          expect(len == truncateLen).assertTrue();
          expect(fileio.closeSync(fd) == null).assertTrue();
          expect(fileio.unlinkSync(fpath) == null).assertTrue();
          done();
        })
        .catch(function (e) {
          console.log('catch ' + e);
        })
    } catch (e) {
      console.log('fileio_test_ftruncate_async_001 has failed for ' + e);
      expect(null).assertFail();
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_FtruncateAsync_0020
   * @tc.name fileio_test_ftruncate_async_002
   * @tc.desc Test ftruncateAsync() interfaces.
   */
  it('fileio_test_ftruncate_async_002', 0, async function (done) {
    let fpath = nextFileName('fileio_test_ftruncate_async_002');
    let truncateLen = 2;
    try {
      fileio.ftruncate(fpath, truncateLen, function (err) {
        done();
      })
    } catch (e) {
      console.log('fileio_test_ftruncate_async_002 has failed for ' + e);
      expect(!!e).assertTrue();
      done();
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_FtruncateSync_0000
   * @tc.name fileio_test_ftruncate_sync_000
   * @tc.desc Test ftruncateSync() interfaces.
   */
   it('fileio_test_ftruncate_sync_000', 0, function () {
    let fpath = nextFileName('fileio_test_ftruncate_sync_000');
    expect(prepareFile(fpath, FILE_CONTENT)).assertTrue();
    let fd = fileio.openSync(fpath, 0o2);
    expect(isIntNum(fd)).assertTrue();
    let truncateLen = 5;
    try {
      fileio.ftruncateSync(fd, truncateLen);
      let len = fileio.readSync(fd, new ArrayBuffer(4096));
      expect(len == truncateLen).assertTrue();
      expect(fileio.closeSync(fd) == null).assertTrue();
      expect(fileio.unlinkSync(fpath) == null).assertTrue();
    } catch (e) {
      console.log('fileio_test_ftruncate_sync_000 has failed for ' + e);
      expect(null).assertFail();
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_FtruncateSync_0010
   * @tc.name fileio_test_ftruncate_sync_001
   * @tc.desc Test ftruncateSync() interfaces.
   */
  it('fileio_test_ftruncate_sync_001', 0, function () {
    let fpath = nextFileName('fileio_test_ftruncate_sync_001');
    expect(prepareFile(fpath, 'truncate')).assertTrue();
    let fd = fileio.openSync(fpath, 0o2);
    expect(isIntNum(fd)).assertTrue();
    let truncateLen = 2;
    try {
      fileio.ftruncateSync(fd, truncateLen);
      let len = fileio.readSync(fd, new ArrayBuffer(4096));
      expect(len == truncateLen).assertTrue();
      expect(fileio.closeSync(fd) == null).assertTrue();
      expect(fileio.unlinkSync(fpath) == null).assertTrue();
    } catch (e) {
      console.log('fileio_test_ftruncate_sync_001 has failed for ' + e);
      expect(null).assertFail();
    }
  });

  /**
   * @tc.number SUB_DF_FileIO_FtruncateSync_0020
   * @tc.name fileio_test_ftruncate_sync_002
   * @tc.desc Test ftruncateSync() interfaces.
   */
  it('fileio_test_ftruncate_sync_002', 0, function () {
    let fpath = nextFileName('fileio_test_ftruncate_sync_002');
    let truncateLen = 2;
    try {
      fileio.ftruncateSync(fpath, truncateLen);
    } catch (e) {
      console.log('fileio_test_ftruncate_sync_002 has failed for ' + e);
      expect(!!e).assertTrue();
    }
  });
});